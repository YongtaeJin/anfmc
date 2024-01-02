const router = require('express').Router();
const shopinfoModel = require('./_model/shopinfoModel');
const passport = require('passport');
const jwt = require('../plugins/jwt');
const { modelCall } = require('../../util/lib');


// 사업LIST
router.get('/getShopMag', async (req, res)=> {	
	const result = await modelCall(shopinfoModel.getShopMag, req);
	res.json(result);
}),
router.post('/duplicateCheckShop', async (req, res)=> {	
	const result = await modelCall(shopinfoModel.duplicateCheckShop, req);
	res.json(result);
}),
router.post('/shopInfoSave', async (req, res)=> {
	const result = await modelCall(shopinfoModel.shopInfoSave, req);
	res.json(result)
}),
router.post('/getShopMagFile', async (req, res)=> {		
	const result = await modelCall(shopinfoModel.getShopMagFile, req);
	res.json(result);
}),
router.post('/getShopMagFileDetail', async (req, res)=> {		
	const result = await modelCall(shopinfoModel.getShopMagFileDetail, req);
	res.json(result);
}),
router.post('/shopAddFile', async (req, res)=> {	
	const result = await modelCall(shopinfoModel.shopAddFile, req);
	res.json(result);
}),
router.post('/shopAddFileDelete', async (req, res) => {
	const result = await modelCall(shopinfoModel.shopAddFileDelete, req);
	res.json(result);
}),

// 접속일 기준 스마트공방 신청 list 있는지 체크
router.get('/checkShopinfo', async (req, res)=> {
	const result = await modelCall(shopinfoModel.checkShopinfo, req);
	res.json(result);
}),
router.get('/ShopinfoDetail', async (req, res)=> {
	const result = await modelCall(shopinfoModel.ShopinfoDetail, req);
	res.json(result);
}),
router.post('/ShopinfoUpdate', async (req, res)=> {
	const result = await modelCall(shopinfoModel.ShopinfoUpdate, req);
	res.json(result);
}),

// 첨부파일 upload
router.patch('/attfiles/upload', async (req, res)=> {	
	const result = await modelCall(shopinfoModel.attfilesupload, req);
	res.json(result);
}),
// 첨부파일 delete
router.delete('/attfiles/delete/:i_shop/:i_no/:i_ser', async(req, res)=>{
	const result = await modelCall(shopinfoModel.attfilesdelete, req);
	res.json(result);
});
// 첨부파일 download
router.get('/getFileDown', async (req, res)=> {	
	const result = await modelCall(shopinfoModel.getFileDown, req);	
	res.json(result);
}),
// 첨부파일 여러개 압축해서 download
router.get('/getFileDownZip', async (req, res)=> {	
	const result = await modelCall(shopinfoModel.getFileDownZip, req);	
	res.json(result);
}),

module.exports = router;