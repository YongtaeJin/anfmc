const fs = require('fs');
const path = require('path');

const db = require('../../plugins/mysql');
const jwt = require('../../plugins/jwt');
const sqlHelper = require('../../../util/sqlHelper');
const TABLE = require('../../../util/TABLE');
const moment = require('../../../util/moment');
const { LV, isGrant } = require('../../../util/level');

const zip = require("node-zip");

function clearShopmagField(shopmag) {
	if (shopmag.d_date1) { shopmag.d_date1 = moment(shopmag.d_date1).format('L')};
	if (shopmag.d_date2) { shopmag.d_date2 = moment(shopmag.d_date2).format('L')};
}

function converDateField(data, cols) {
	Object.keys(data).forEach((key, idx) => {
		// console.log(key,  idx);
		// 
		cols.forEach((col) => {
			if (key == col) {
				if (data[key]) data[key] = moment(data[key]).format('LT');
			}
		});
	});
	return data;	
}
const shopinfoModel = {
	async getShopMag(req) {
		// 권한 확인
		if (!isGrant(req, LV.VIP)) {
			throw new Error('사용 권한이 없습니다.');
		}
		const sql = "select i_shop, n_shop, d_date1, d_date2, t_remark, t_remark2 from tb_shopmag order by i_shop desc";
		const [row] = await db.execute(sql);
		row.forEach((data) => {
			clearShopmagField(data);
		});

       	return row;
    },
    async duplicateCheckShop(req) {
        const payload = { ...req.body };
        const sql = sqlHelper.SelectSimple(TABLE.SHOPMAG, { [payload.field]: payload.value }, ['COUNT(*) AS cnt']);
        const [[row]] = await db.execute(sql.query, sql.values);

        return row;     
    },
    async shopInfoSave(req) {
        const payload = { ...req.body, };
		const { i_shop } = payload;
		const sql = sqlHelper.InsertOrUpdate(TABLE.SHOPMAG, payload, {i_shop});
		const [row] = await db.execute(sql.query, sql.values);
        
		return row;
    },
	async getShopMagFile(req) {		
		const payload = { ...req.body };
		const sort = req.body.sortBy ;
		delete payload.sortBy;
		// const { i_shop, f_gubun } = payload;
		
		const sql = sqlHelper.SelectSimple(TABLE.SHOPMAGFLE, payload, {sort});
		sql.query = sort ?  ` ${ sql.query } order by ${ sort }` : sql.query;
		
		const [row] = await db.execute(sql.query, sql.values);        
		return row;
	},
	async getShopMagFileDetail(req) {
		const payload = { ...req.body };
		const sql = sqlHelper.SelectSimple(TABLE.SHOPMAGFLE, payload);
		console.log(sql)
		const [row] = await db.execute(sql.query, sql.values);        
		return row;
	},

	async shopAddFile(req) {
		const payload = {
			...req.body,
		};
		const {  i_shop,  i_ser,  f_gubun, f_yn, n_nm, n_file, t_filenm, t_remark,  t_sample,  i_sort,  isNew,  i_shop_select, f_del } = payload;

		let fPath = `${UPLOAD_PATH}/shopsigned/${i_shop_select}` ; // 서버 파일 저장 위치 Full Path  (Root 폴더 위치 부터)
		let tPath = `/upload/shopsigned/${i_shop_select}` ;        // DB 저장 칼럼 상태 위치 
		let tPathFile = "";
		let tFilenm = "";


		//디렉토리의 전체 접속 권한 부여
		const makeFolder = (dir) => {
			if( !fs.existsSync(dir) )  { 				
				fs.mkdirSync(dir, { recursive: true }, err => {});				
			} ;
		}
		makeFolder(fPath); // 폴더생성

		if ( req.files )  {			
			const { t_image } = req.files;
			const fileName = `${i_ser}_` + jwt.getRandToken(16);
			const newFile = `${fPath}/${fileName}${path.extname(t_image.name)}`;
			tPathFile = `${tPath}/${fileName}${path.extname(t_image.name)}`;
			tFilenm = t_sample;

			t_image.mv(newFile, (err)=>{
				if ( err ) {
					console.log('업로드 실패', err);
					return;
				}
			});	
		} else {			
			if (!f_del) {
				tFilenm = t_filenm;
				tPathFile = t_sample;
			} else {
				let delFile = `${SERVER_PATH}${t_sample}` ;
				try {				
					fs.unlinkSync(delFile);
				}  catch(e) {}

			}
		}
		let jobser = i_ser;
		let oldFile = null;
		if (isNew == "true") {
			const [[getser]] = await db.execute("select max(i_ser) ser from tb_shopmag_file where i_shop = '" + i_shop_select + "'");
			const { ser } = getser;
			if (!ser) { setser = 1  }  else { setser = ser + 1};
			jobser = setser;

			sql = "insert into tb_shopmag_file " +
			      " (i_shop,  i_ser,  f_gubun, f_yn, n_nm, n_file, t_filenm, t_remark,  i_sort, t_sample) " +
				  " values ('" + i_shop_select + "' , " + setser + ", '" + f_gubun + "', '" + f_yn + "', '" + n_nm + "', '" + n_file + "', '" + tFilenm + "', '" + t_remark + "'," + i_sort + ", '" + tPathFile + "')";
		} else {
			[[oldFile]] = await db.execute(`select t_sample from tb_shopmag_file where i_shop = '${i_shop}' and i_ser = '${i_ser}'`);
			
			sql = "update tb_shopmag_file  " +
			      "   set f_gubun = '" + f_gubun + "', " +
				  "       f_yn = '" + f_yn + "', " +
				  "       n_nm = '" + n_nm + "', " +
				  "       n_file = '" + n_file + "', " +
				  "       t_filenm = '" + tFilenm + "', " +
				  "       t_remark = '" + t_remark + "', " +
				  "       t_sample = '" + tPathFile + "', " +			
				  "       i_sort   = " + i_sort +
				  " where i_shop = '" + i_shop + "' and i_ser = " + i_ser ;
		}		
		const [row] = await db.execute(sql);		
		if (isNew !== "true" && oldFile.t_sample && req.files && (row.affectedRows == 1 || row.affectedRows == 2) ) {			
			let olddelFile = `${SERVER_PATH}${oldFile.t_sample}` ;			
			try {				
				fs.unlinkSync(olddelFile);
			}  catch(e) {console.log('shopAddFile',e)}	
		}
		return row.affectedRows == 1 || row.affectedRows == 2 ? jobser : -1;
	},

	async shopAddFileDelete(req) {
		const payload = {
			...req.body,
		};
		const { i_shop, i_ser, t_sample } = payload;
		
		const sql = sqlHelper.DeleteSimple(TABLE.SHOPMAGFLE, {i_shop, i_ser});
		const [row] = await db.execute(sql.query, sql.values);
		if (row.affectedRows == 1 && t_sample) {					
			let delFile = `${SERVER_PATH}${t_sample}` ;
			try {				
				fs.unlinkSync(delFile);
			}  catch(e) {console.log('shopAddFileDelete',e)}
		}
		return row.affectedRows > 0 ;
	},

	// 스마트공방 신청/등록
	async checkShopinfo(req) {
		const sql1 = "select i_shop from tb_shopmag where  now() between d_date1 and d_date2";
    	const [[shop]] = await db.execute(sql1);		
		return shop;
	},
	async ShopinfoDetail(req) {
		const { i_shop, i_id } = req.query;
		const sql = sqlHelper.SelectSimple(TABLE.SHOPINPUT, {i_shop, i_id});
		const [rows] = await db.execute(sql.query, sql.values);

		//converDateField\
		rows.forEach((row) => {
            row = converDateField(row, ['d_persioninfo', 'd_argee']);
        });
		
		return rows;
	},
	async ShopinfoUpdate(req) {
		payload = { ...req.body,};
		payload.d_persioninfo = moment().format('LT');

		const sql = sqlHelper.InsertOrUpdate(TABLE.SHOPINPUT, payload);
		const [row] = await db.execute(sql.query, sql.values);

		return row;
	},

	// 첨부파일 Upload
	async attfilesupload(req) {
		const token = req.cookies.token;
		const { i_id } = jwt.vetify(req.cookies.token);
		const payload = {
			...req.body,
		};
		delete payload.f_yn;

		const { i_shop, i_ser, f_yn, n_filename, i_no, t_att, f_del } = payload;		
		const makeFolder = (dir) => {
			if( !fs.existsSync(dir) )  { 				
				fs.mkdirSync(dir, { recursive: true }, err => {});				
			} ;
		}
		if ( !i_shop )  { return ; }

		const { n_file } = req.files;
		// UPLOAD 폴더 생성 (신청번호: 첫번재 i_shop)		
		let fPath = "";   // 서버 파일 저장 위치 Full Path  (Root 폴더 위치 부터)
		let tPath = "";   // DB 저장 칼럼 상태 위치 
		//req.files.mb_image.mv(`${MEMBER_PHOTO_PATH}/${fileName}.jpg`, (err) => {
		if (Array.isArray(i_shop)) {  
			fPath = `${UPLOAD_PATH}/shopsigned/${i_shop[0]}/${mb_id}` ;
			tPath = `/upload/shopsigned/${i_shop[0]}/${mb_id}` ;
		} else { 
			fPath = `${UPLOAD_PATH}/shopsigned/${i_shop}/${mb_id}` 
			tPath = `/upload/shopsigned/${i_shop}/${mb_id}` ;			
		} ;
		makeFolder(fPath);

		if (Array.isArray(i_shop)) {			
			i_shop.forEach(async function(item, index) {
				const fileName = `${i_ser[index]}_` + jwt.getRandToken(16);
				const newFile = `${fPath}/${fileName}${path.extname(n_file[index].name)}`;
				const tPathFile = `${tPath}/${fileName}${path.extname(n_file[index].name)}`;
				n_file[index].mv(newFile, (err)=>{
					if ( err ) {
						console.log('업로드 실패', err);
						return;
					}
				});
				sql = "select count(*) cnt  from tb_shopinput_file where i_shop = '" + i_shop[index] + "' and i_no = "  + i_no[index] + " and i_ser = " + i_ser[index];
				const [[data]] = await  db.execute(sql);
				if ( !data.cnt ) {
					sql = "insert into tb_shopinput_file (i_shop, i_no, i_ser, n_file, t_att, f_noact) " +
						  " values ('" + i_shop[index] + "'," + i_no[index] + "," + i_ser[index] + ", '" + t_att[index] + "', '" + tPathFile + "', 'I')";
				} else {
					sql = "update tb_shopinput_file set n_file = '" + t_att[index] + "', t_att = '" + tPathFile + "', f_noact = if(f_noact = 'N', 'R', f_noact)" +
						  " where i_shop = '" + i_shop[index] + "' and i_no = " + i_no[index] + " and i_ser = " + i_ser[index] ;
				}
				const [row] = await db.execute(sql);
			});
		} else {
			//const fileName = jwt.getRandToken(16);
			const fileName = `${i_ser}_` + jwt.getRandToken(16);
			const newFile = `${fPath}/${fileName}${path.extname(n_file.name)}`;
			const tPathFile = `${tPath}/${fileName}${path.extname(n_file.name)}`;
			n_file.mv(newFile, (err)=>{
				if ( err ) {
					console.log('업로드 실패', err);
					return;
				}
			});			

			sql = "select count(*) cnt  from tb_shopinput_file where i_shop = '" + i_shop + "' and i_no = "  + i_no + " and i_ser = " + i_ser;
			const [[data]] = await db.execute(sql);
			if ( !data.cnt ) {
				sql = "insert into tb_shopinput_file (i_shop, i_no, i_ser, n_file, t_att, f_noact) " +
				      " values ('" + i_shop + "'," + i_no + "," + i_ser + ", '" + t_att + "', '" + tPathFile + "', 'I')";
			} else {
				sql = "update tb_shopinput_file set n_file = '" + t_att + "', t_att = '" + tPathFile + "', f_noact = if(f_noact = 'N', 'R', f_noact)" +
				      " where i_shop = '" + i_shop + "' and i_no = " + i_no + " and i_ser = " + i_ser ;
			}
			const [row] = await db.execute(sql);
			
			return row;
		}
	},

	// 첨부파일 다운로드
	async getFileDown(req, res) {		
		let fPath = `${SERVER_PATH}` ;
		const { path } = req.query;		
		let filePath = fPath + path;
		
		const file = fs.readFileSync(filePath);	
		
		return file;
	},
	async getFileDownZip(req, res) {
		const { i_shop, i_no, f_gubun, f_filetype } = req.query;
		let fPath = `${SERVER_PATH}` ;
		var t_path = "";
		// D:/WEBAPP/protagonist/server/upload/shopsigned/23-001/freeview/2_afUOwFG3RaccbLph.xlsx
		let sql = "select a.n_file, a.t_att, b.n_file n_title " +
		          " from tb_shopinput_file  a " +
				  "      join tb_shopmag_file b on a.i_shop = b.i_shop and a.i_ser = b.i_ser and b.f_gubun = '" + f_gubun + "'" +
				  " where a.i_shop = '" + i_shop + "' "+
				  "   and a.i_no = " + i_no ;
		const [files] = await db.execute(sql); 

		//  console.log(files);
		var zip = new require('node-zip')();
		files.forEach((data) => {
			var tPath = fPath + data.t_att;
			if (fs.existsSync(tPath)) {
				t_path = tPath.split("/").slice(0, -1).join("/");
				// var t_file = tPath.substring(tPath.lastIndexOf('/') + 1);
				// var to_path = t_path + "/" + data.n_file;
				
				// fs.copyFileSync(tPath, to_path);   // 파일명 변경 작업
				// fs.unlinkSync(to_path);  // 압축후 파일 삭제
				var nfilename = "";
				if(f_filetype == "2") { 
					nfilename = data.n_title + tPath.substring(tPath.lastIndexOf('.')) ;					
				} else {
					nfilename = data.n_file;
				}
				zip.file(nfilename, fs.readFileSync(tPath));
			}
		});		
		if (t_path) {
			var data = zip.generate({base64:false, compression:'DEFLATE'});
			fs.writeFileSync(`${t_path}/zip.zip`, data, 'binary');
			const file = fs.readFileSync(`${t_path}/zip.zip`);	
			return file;
		}
		return ;
	},
}

module.exports = shopinfoModel;