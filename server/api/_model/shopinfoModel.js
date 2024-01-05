const fs = require('fs');
const path = require('path');

const db = require('../../plugins/mysql');
const jwt = require('../../plugins/jwt');
const sqlHelper = require('../../../util/sqlHelper');
const TABLE = require('../../../util/TABLE');
const sendMailer = require('../../plugins/sendMailer');
const moment = require('../../../util/moment');
const { LV, isGrant } = require('../../../util/level');

const zip = require("node-zip");
const { Table } = require('jspdf-autotable');

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
	async ShopComUpdate(req) {
		payload = { ...req.body,};
		const { i_shop, i_id } = payload;
		delete payload.i_shop;
		delete payload.i_id;
		
		const sql = sqlHelper.Update(TABLE.SHOPINPUT, payload, {i_shop, i_id});
		const [row] = await db.execute(sql.query, sql.values);	
		return row;
	},
	async ShopAttFiles(req) {
		payload = { ...req.query,};
		
		const { i_shop, i_id } = payload;
		const f_gubun = '1';
		const sql = { query: "",  values: [] }

		sql.query = `select a.i_shop, a.i_ser, a.f_yn, a.n_nm, a.n_file n_filename, a.f_gubun, \n `
			 	  +	`       b.i_id, null n_file, b.n_file n_file2, b.t_att, b.f_noact, a.t_remark, a.t_sample, a.t_filenm t_samplefile, '0' f_job \n `
			 	  +	`  from tb_shopmag_file a \n `
			 	  +	`		left outer join tb_shopinput_file b on a.i_shop = b.i_shop and a.i_ser = b.i_ser and b.i_id = ? \n`
			 	  +	`  where a.i_shop = ? \n `
				  + `    and a.f_gubun = ? \n`  				  
			 	  +	`  order by a.i_shop, a.i_ser `;
		sql.values.push(i_id);
		sql.values.push(i_shop);
		sql.values.push(f_gubun);
		
		const [rows] = await db.execute(sql.query, sql.values);	
		
		return rows;

	},
	async ShopAttFilesAdd(req) {
		payload = { ...req.query,};
		
		const { i_shop, i_id } = payload;
		const f_gubun = '2';
		const sql = { query: "",  values: [] }

		sql.query = `select a.i_shop, a.i_ser, a.f_yn, a.n_nm, a.n_file n_filename, a.f_gubun, \n `
			 	  +	`       b.i_id, null n_file, b.n_file n_file2, b.t_att, b.f_noact, a.t_remark, a.t_sample, a.t_filenm t_samplefile, '0' f_job \n `
			 	  +	`  from tb_shopmag_file a \n `
			 	  +	`		left outer join tb_shopinput_file b on a.i_shop = b.i_shop and a.i_ser = b.i_ser and b.i_id = ?  \n`
			 	  +	`  where a.i_shop = ? \n `
				  + `    and a.f_gubun = ? \n`  				  
			 	  +	`  order by a.i_shop, a.i_ser `;
		sql.values.push(i_id);
		sql.values.push(i_shop);
		sql.values.push(f_gubun);		
		const [rows] = await db.execute(sql.query, sql.values);	
		
		return rows;
	},
	async ShopAttFilesArgee(req) {
		payload = { ...req.query,};
		
		const { i_shop, i_id } = payload;
		const f_gubun = '3';
		const sql = { query: "",  values: [] }

		sql.query = `select a.i_shop, a.i_ser, a.f_yn, a.n_nm, a.n_file n_filename, a.f_gubun, \n `
			 	  +	`       b.i_id, null n_file, b.n_file n_file2, b.t_att, b.f_noact, a.t_remark, a.t_sample, a.t_filenm t_samplefile, '0' f_job \n `
			 	  +	`  from tb_shopmag_file a \n `
			 	  +	`		left outer join tb_shopinput_file b on a.i_shop = b.i_shop and a.i_ser = b.i_ser and b.i_id = ?  \n`
			 	  +	`  where a.i_shop = ? \n `
				  + `    and a.f_gubun = ? \n`  				  
			 	  +	`  order by a.i_shop, a.i_ser `;
		sql.values.push(i_id);
		sql.values.push(i_shop);
		sql.values.push(f_gubun);		
		const [rows] = await db.execute(sql.query, sql.values);	
		
		return rows;
	},


	// 첨부파일 Upload
	async attfilesupload(req) {
		const payload = {
			...req.body,
		};
		const { i_shop, i_ser, i_id, t_att, f_job } = payload;	
		if ( !i_shop || !i_id)  { return ; }
		
		const makeFolder = (dir) => {
			if( !fs.existsSync(dir) )  { 				
				fs.mkdirSync(dir, { recursive: true }, err => {});				
			} ;
		}
		const { n_file } = req.files;
		// UPLOAD 폴더 생성 (신청번호: 첫번재 i_shop)		
		let fPath = "";   // 서버 파일 저장 위치 Full Path  (Root 폴더 위치 부터)
		let tPath = "";   // DB 저장 칼럼 상태 위치 
		
		if (Array.isArray(i_shop)) {  
			fPath = `${UPLOAD_PATH}/shopsigned/${i_shop[0]}/${i_id}` ;
			tPath = `/upload/shopsigned/${i_shop[0]}/${i_id}` ;
		} else { 
			fPath = `${UPLOAD_PATH}/shopsigned/${i_shop}/${i_id}` 
			tPath = `/upload/shopsigned/${i_shop}/${i_id}` ;			
		} ;
		makeFolder(fPath);
		
		let oldFile = [];
		if (Array.isArray(i_shop)) {			
			i_shop.forEach(async function(item, index) {
				let isNew = true;
				const [[tfile]] = await db.execute("select t_att  from tb_shopinput_file where i_shop = '" + i_shop[index] + "' and i_id = '"  + i_id[index] + "' and i_ser = " + i_ser[index]);
				if (tfile) {
					oldFile.push(tfile);
					isNew = false
				}
				const fileName = `${i_ser[index]}_` + jwt.getRandToken(16);
				const newFile = `${fPath}/${fileName}${path.extname(n_file[index].name)}`;
				const tPathFile = `${tPath}/${fileName}${path.extname(n_file[index].name)}`;
				n_file[index].mv(newFile, (err)=>{
					if ( err ) {
						console.log('업로드 실패', err);
						return false;
					}
				});
				
				if ( isNew ) {
					sql = "insert into tb_shopinput_file (i_shop, i_id, i_ser, n_file, t_att, f_noact) " +
						  " values ('" + i_shop[index] + "'," + i_id[index] + "," + i_ser[index] + ", '" + t_att[index] + "', '" + tPathFile + "', 'I')";
				} else {
					sql = "update tb_shopinput_file set n_file = '" + t_att[index] + "', t_att = '" + tPathFile + "', f_noact = if(f_noact = 'N', 'R', f_noact)" +
						  " where i_shop = '" + i_shop[index] + "' and i_id = '" + i_id[index] + "' and i_ser = " + i_ser[index] ;
				}
				const [row] = await db.execute(sql);
			});
		} else {
			let isNew = true;
			const [[tfile]] = await db.execute(`select t_att from tb_shopinput_file where i_shop = ? and i_id = ? and i_ser = ?`, [i_shop, i_id, i_ser]);
			if (tfile) {
				oldFile.push(tfile);
				isNew = false
			}			
			
			const fileName = `${i_ser}_` + jwt.getRandToken(16);
			const newFile = `${fPath}/${fileName}${path.extname(n_file.name)}`;
			const tPathFile = `${tPath}/${fileName}${path.extname(n_file.name)}`;
			n_file.mv(newFile, (err)=>{
				if ( err ) {
					console.log('업로드 실패', err);
					return false;
				}
			});
			if ( isNew ) {
				sql = "insert into tb_shopinput_file (i_shop, i_id, i_ser, n_file, t_att, f_noact) " +
				      " values ('" + i_shop + "', '" + i_id + "'," + i_ser + ", '" + t_att + "', '" + tPathFile + "', 'I')";
			} else {
				sql = "update tb_shopinput_file set n_file = '" + t_att + "', t_att = '" + tPathFile + "', f_noact = if(f_noact = 'N', 'R', f_noact)" +
				      " where i_shop = '" + i_shop + "' and i_id = '" + i_id + "' and i_ser = " + i_ser ;
			}
			const [row] = await db.execute(sql);
		}
		
		oldFile.forEach((item) => {			
			let olddelFile = `${SERVER_PATH}${item.t_att}` ;			
			try {				
				fs.unlinkSync(olddelFile);
			}  catch(e) {console.log('attfilesupload',e)}	
		});
		return true;
	},
	// 첨부파일 삭제처리
	async attfilesdelete(req) {
		// 파일정보 삭제 처리 		
		const { i_shop, i_id, i_ser } = req.params;
		const [[ { t_att } ]] = await db.execute("select t_att from tb_shopinput_file where i_shop = '" + i_shop + "' and i_id = '" + i_id + "' and i_ser = " + i_ser);
		if ( !t_att )  return false;
		const sql = sqlHelper.DeleteSimple(TABLE.SHOPINPUTFILE, { i_shop, i_id, i_ser });
		const [row] = await db.execute(sql.query, sql.values);		
		if (row.affectedRows == 1) {
			// 실제 파일 삭제 처리 			
			let delFile = `${SERVER_PATH}${t_att}` ;
			try {				
				fs.unlinkSync(delFile);
			}  catch(e) {}
		}
		return row.affectedRows == 1;		
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
		// console.log(req.query)
		const { i_shop, i_id, f_gubun, f_filetype } = req.query;
		let fPath = `${SERVER_PATH}` ;
		var t_path = "";
		
		let sql = "select a.n_file, a.t_att, b.n_nm n_title " +
		          " from tb_shopinput_file  a " +
				  "      join tb_shopmag_file b on a.i_shop = b.i_shop and a.i_ser = b.i_ser and b.f_gubun = '" + f_gubun + "'" +
				  " where a.i_shop = '" + i_shop + "' "+
				  "   and a.i_id = '" + i_id + "'";
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

	async ShopUserList(req) {
		const { f_serarch } = req.query;

		const sql = "select c_com, i_id, n_name, e_email, if(i_level=2,'일반', '관리자') n_level, i_password, 'N' f_del  " +
				    "  from tb_members " +
	   			    " where not exists (select * from tb_notuserchk t where tb_members.i_id = t.i_id) " +
					"   and c_com = 'FMCREG'" +
					"   and (i_id like '%" + f_serarch + "%' or n_name like '%" + f_serarch + "%' or e_email like '%" + f_serarch + "%')" +
	   			    " order by i_id, n_name";
		const [rows] = await db.execute(sql);
       	return rows;		
	},
	async ShopUserDelete(req) {
		const { i_id } = req.query;
		const sql = { query: "",  values: [] }
		sql.query = `delete from tb_members where c_com = 'FMCREG' and i_id = ?`;
		sql.values.push(i_id);
		const [row] = await db.execute(sql.query, sql.values);
		
		return row;	
	},
	async getShopList(req) {
		const [row] = await db.execute(`select i_shop, n_shop from tb_shopmag order by i_shop desc`);		
		return row;	
	},
	async getShopInputMag(req) {
		const payload = { ...req.body};
		const sql = "select a.i_shop, a.i_id, " +
					"		coalesce(n_company, a.i_id) n_company, " +
					"		f_persioninfo, " +
					"		if(coalesce( " +
					"			length(trim(i_regno)) + length(trim(n_company)) + length(trim(n_person)) + length(trim(t_tel1)) + length(trim(t_tel2)) + length(trim(i_email)) + " +
					"			length(trim(i_presno)) + length(trim(i_post)) + length(trim(t_addr1)) + length(trim(t_addr2)) + length(trim(t_tel2)) + length(trim(f_saugup)) + " +
					"			length(trim(f_run)) + length(trim(f_dart)) + length(trim(t_enarainfo)) + length(trim(t_enarainfopw)) " +
					"			, 0) > 0, 'Y', 'N') chk1, " +
					"		if(b.f_f1y = c.f_u1y, 'Y', 'N') chk2, " +
					"		if(b.f_f2y = 0, '-', if(b.f_f2y = c.f_u2y, 'Y', 'N')) chk3, " +
					"		if(b.f_f3y = c.f_u3y, 'Y', 'N') chk4, " +
					"		f_dochk, " +
					"		f_enarachk	 " +				
					" from tb_shopinput a " +
					"		left outer join (select i_shop,  " +
					"								sum(case when f_gubun = '1' and f_yn = '1' then 1 else 0 end) f_f1y, " +
					"								sum(case when f_gubun = '1' and f_yn = '0' then 1 else 0 end) f_f1n, " +
					"								sum(case when f_gubun = '2' and f_yn = '1' then 1 else 0 end) f_f2y, " +
					"								sum(case when f_gubun = '2' and f_yn = '0' then 1 else 0 end) f_f2n, " +
					"								sum(case when f_gubun = '3' and f_yn = '1' then 1 else 0 end) f_f3y, " +
					"								sum(case when f_gubun = '3' and f_yn = '0' then 1 else 0 end) f_f3n " +
					"						from tb_shopmag_file  " +
					"						where i_shop = '" + payload.i_shop + "' " +
					"						group by i_shop) b on a.i_shop = b.i_shop " +
					"		left outer join (select c2.i_shop, c2.i_id, " +
					"								sum(case when f_gubun = '1' and f_yn = '1' and f_noact <> 'N' then 1 else 0 end) f_u1y, " +
					"								sum(case when f_gubun = '1' and f_yn = '0' and f_noact <> 'N' then 1 else 0 end) f_u1n, " +
					"								sum(case when f_gubun = '2' and f_yn = '1' and f_noact <> 'N' then 1 else 0 end) f_u2y, " +
					"								sum(case when f_gubun = '2' and f_yn = '0' and f_noact <> 'N' then 1 else 0 end) f_u2n, " +
					"								sum(case when f_gubun = '3' and f_yn = '1' and f_noact <> 'N' then 1 else 0 end) f_u3y, " +
					"								sum(case when f_gubun = '3' and f_yn = '0' and f_noact <> 'N' then 1 else 0 end) f_u3n " +
					"						from tb_shopmag_file c1 " +
					"								join tb_shopinput_file c2 on  c1.i_shop = c2.i_shop and c1.i_ser = c2.i_ser " +
					"						where c1.i_shop = '" + payload.i_shop + "' " + 
					"						group by c2.i_shop, c2.i_id) c on a.i_shop = b.i_shop and a.i_id = c.i_id " +
					" where a.i_shop = '" + payload.i_shop + "' " ;
					// "   and trim(coalesce(n_company, a.i_userid)) like '" + chkf_serarch + "%'" +
					// "   and coalesce(f_dochk, 'N') like '" + chkf_dochk + "'" +
					// "   and coalesce(f_enarachk, 'N') like '" + chkf_enara + "'";
		const [row] = await db.execute(sql)	
		return row;
	},
	async getShopInputMag1(req) {
		const {i_shop, i_id } = req.body;
		const sql = sqlHelper.SelectSimple(TABLE.SHOPINPUT, {i_shop, i_id});

		const [[row]] = await db.execute(sql.query, sql.values);		
		return row;	
	},
	async getShopInputMag2(req) {
		const {i_shop, i_id, f_gubun } = req.body;
		const sql = "select a.i_shop, a.i_ser, a.f_gubun, a.f_yn, a.n_nm n_filename, " +
					"       c.i_id, b.n_file, b.t_att, b.f_noact, '0' f_edit " +
					"  from tb_shopmag_file a " +
					"       left outer join tb_shopinput c on a.i_shop = c.i_shop and c.i_id = '" + i_id + "'" +
					"       left outer join tb_shopinput_file b on a.i_shop = b.i_shop and a.i_ser = b.i_ser and c.i_id = b.i_id " +
					" where a.i_shop = '" + i_shop + "' " +
					"   and a.f_gubun = '" + f_gubun + "'" +
					" order by a.i_shop, a.i_ser ";	
		const [row] = await db.execute(sql);		
       	return row;
	},
	async ShopInputMagDocChk(req) {
		const { i_shop, i_id, f_dochk, f_enarachk, f_argeechk } = req.body;
		const at = moment().format('LT');
		const sql = { query: "",  values: [] }
		sql.query = `update tb_shopinput set f_dochk = ?, d_dochk = now() where i_shop = ? and i_id = ?`
		sql.values.push(f_dochk);
		sql.values.push(i_shop);
		sql.values.push(i_id);
		const [row] = await db.execute(sql.query, sql.values);
		return row;
	},
	async ShopInputMageNaraChk(req) {
		const { i_shop, i_id, f_dochk, f_enarachk, f_argeechk } = req.body;
		const at = moment().format('LT');
		const sql = { query: "",  values: [] }
		sql.query = `update tb_shopinput set f_enarachk = ?, d_enarachk = now() where i_shop = ? and i_id = ?`
		sql.values.push(f_enarachk);
		sql.values.push(i_shop);
		sql.values.push(i_id);
		const [row] = await db.execute(sql.query, sql.values);
		return row;
	},
	async ShopInputMagArgeeChk(req) {
		const { i_shop, i_id, f_dochk, f_enarachk, f_argeechk } = req.body;
		const at = moment().format('LT');
		const sql = { query: "",  values: [] }
		sql.query = `update tb_shopinput set f_argeechk = ?, d_argee = now() where i_shop = ? and i_id = ?`
		sql.values.push(f_argeechk);
		sql.values.push(i_shop);
		sql.values.push(i_id);
		const [row] = await db.execute(sql.query, sql.values);
		return row;
	},
	async getShopArgeeMag(req) {
		const {i_shop } = req.body;
		const sql = { query: "",  values: [] }
		sql.query = `select a.i_shop, a.i_id, trim(coalesce(a.n_company, a.i_id)) n_company, a.f_argeechk, \n` 
		          + `       max(b.rnum) rnum, \n`
				  + `       max(if(b.rnum = 1, b.n_nm, '')) h1, max(if(b.rnum = 2, b.n_nm, '')) h2, max(if(b.rnum = 3, b.n_nm, '')) h3, max(if(b.rnum = 4, b.n_nm, '')) h4, max(if(b.rnum = 5, b.n_nm, '')) h5, max(if(b.rnum = 6, b.n_nm, '')) h6, max(if(b.rnum = 7, b.n_nm, '')) h7, max(if(b.rnum = 8, b.n_nm, '')) h8, max(if(b.rnum = 9, b.n_nm, '')) h9, max(if(b.rnum = 10, b.n_nm, '')) h10, \n`
				  + `       max(if(b.rnum = 11, b.n_nm, '')) h11, max(if(b.rnum = 12, b.n_nm, '')) h12, max(if(b.rnum = 13, b.n_nm, '')) h13, max(if(b.rnum = 14, b.n_nm, '')) h14, max(if(b.rnum = 15, b.n_nm, '')) h15, max(if(b.rnum = 16, b.n_nm, '')) h16, max(if(b.rnum = 17, b.n_nm, '')) h17, max(if(b.rnum = 18, b.n_nm, '')) h18, max(if(b.rnum = 19, b.n_nm, '')) h19, max(if(b.rnum = 20, b.n_nm, '')) h20, \n`
				  + `       max(if(b.rnum = 1 and c.f_noact <> 'N', c.t_att, '')) t1, max(if(b.rnum = 2 and c.f_noact <> 'N', c.t_att, '')) t2, max(if(b.rnum = 3 and c.f_noact <> 'N', c.t_att, '')) t3, max(if(b.rnum = 4 and c.f_noact <> 'N', c.t_att, '')) t4, max(if(b.rnum = 5 and c.f_noact <> 'N', c.t_att, '')) t5, max(if(b.rnum = 6 and c.f_noact <> 'N', c.t_att, '')) t6, max(if(b.rnum = 7 and c.f_noact <> 'N', c.t_att, '')) t7, max(if(b.rnum = 8 and c.f_noact <> 'N', c.t_att, '')) t8, max(if(b.rnum = 9 and c.f_noact <> 'N', c.t_att, '')) t9, max(if(b.rnum = 10 and c.f_noact <> 'N', c.t_att, '')) t10, \n`
				  + `       max(if(b.rnum = 11 and c.f_noact <> 'N', c.t_att, '')) t11, max(if(b.rnum = 12 and c.f_noact <> 'N', c.t_att, '')) t12, max(if(b.rnum = 13 and c.f_noact <> 'N', c.t_att, '')) t13, max(if(b.rnum = 14 and c.f_noact <> 'N', c.t_att, '')) t14, max(if(b.rnum = 15 and c.f_noact <> 'N', c.t_att, '')) t15, max(if(b.rnum = 16 and c.f_noact <> 'N', c.t_att, '')) t16, max(if(b.rnum = 17 and c.f_noact <> 'N', c.t_att, '')) t17, max(if(b.rnum = 18 and c.f_noact <> 'N', c.t_att, '')) t18, max(if(b.rnum = 19 and c.f_noact <> 'N', c.t_att, '')) t19, max(if(b.rnum = 20 and c.f_noact <> 'N', c.t_att, '')) t20 \n`
				  + `  from tb_shopinput a \n`
				  + `       left outer  join  (select i_shop, i_ser, f_gubun,  @rownum := @rownum+1 AS rnum, n_nm \n`
				  + `                            from tb_shopmag_file, (SELECT @rownum := 0) AS R \n`
				  + `                           where i_shop = ? and f_gubun = '3' order by i_sort) b on a.i_shop = b.i_shop \n`
				  + `       left outer join tb_shopinput_file c on a.i_shop = c.i_shop and a.i_id = c.i_id and b.i_ser = c.i_ser \n`
				  + ` where a.i_shop = ? \n`
				  + ` group by a.i_shop, a.i_id, a.n_company, a.f_argeechk \n`
				  + ` order by i_id `;
				  
		sql.values.push(i_shop);
		sql.values.push(i_shop);
		// console.log(sql.query)
		const [row] = await db.execute(sql.query, sql.values);
		return row;
	},

	async shopgetEmail(req) {
		const { gubun, i_shop, i_id } = req.query;
		let sql = "";
		if (gubun == 'S') {
			sql = "select i_email to_email from tb_shopinput where i_shop = '" + i_shop+ "' and i_id = '" + i_id + "'";
		} else if (gubun == 'TOKEN') {
			const token = req.cookies.token;
			const { i_id } = jwt.vetify(token);
			sql = "select e_email to_email from tb_members where i_id = '" + i_id + "'";
		} else {
			sql = "select e_email to_email from tb_members where i_id = '" + i_id + "'";
		}		
		const [row] = await db.execute(sql);
       	return row;	
	},
	async postMailSend(req) {
		const title = 'ANFMC';				
		const payload = {
			...req.body,
		};
		try {		
			const tb_mailsend = {
				e_to: payload.to_email,
				e_cc: payload.cc_email,
				t_subject: payload.title,
				t_content: payload.body,
				d_crdt: moment().format('LT'),
			}
			
			await sendMailer(`스마트공방 관리자`, payload.to_email, payload.cc_email, payload.title, payload.body);
			// const smSql = sqlHelper.Insert('tb_mailsend', tb_mailsend);
			// await db.execute(smSql.query, smSql.values);
			
		} catch (e) {
			return { err: `email 발송에 필패 하였습니다.\n관리자에게 문의 주세요.` }
		}
       	return 'ok';
	},

	async ShopInputMag2Save(req) {		
		const { i_shop, i_id, i_ser, f_noact } = req.body;	
		const sql = { query: "",  values: [] }

		sql.query = `update tb_shopinput_file set f_noact = ? where i_shop = ? and i_id = ? and i_ser = ?`;
		sql.values.push(f_noact);
		sql.values.push(i_shop);
		sql.values.push(i_id);
		sql.values.push(i_ser);
		
		const [row] = await db.execute(sql.query, sql.values);
       	return row;	
	}
}

module.exports = shopinfoModel;