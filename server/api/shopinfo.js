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
router.post('/ShopComUpdate', async (req, res)=> {
	const result = await modelCall(shopinfoModel.ShopComUpdate, req);
	res.json(result);
}),
router.get('/ShopAttFiles', async (req, res)=> {
	const result = await modelCall(shopinfoModel.ShopAttFiles, req);
	res.json(result);
}),
router.get('/ShopAttFilesAdd', async (req, res)=> {
	const result = await modelCall(shopinfoModel.ShopAttFilesAdd, req);
	res.json(result);
}),
router.get('/ShopAttFilesArgee', async (req, res)=> {
	const result = await modelCall(shopinfoModel.ShopAttFilesArgee, req);
	res.json(result);
}),

router.get('/ShopUserList', async (req, res)=> {
	const result = await modelCall(shopinfoModel.ShopUserList, req);
	res.json(result);
}),
router.patch('/ShopUserDelete', async (req, res)=> {
	const result = await modelCall(shopinfoModel.ShopUserDelete, req);
	res.json(result);
}),
router.get('/getShopList', async (req, res)=> {
	const result = await modelCall(shopinfoModel.getShopList, req);
	res.json(result);
}),
router.post('/getShopInputMag', async (req, res)=> {
	const result = await modelCall(shopinfoModel.getShopInputMag, req);
	res.json(result);
}),
router.post('/getShopInputMag1', async (req, res)=> {
	const result = await modelCall(shopinfoModel.getShopInputMag1, req);
	res.json(result);
}),
router.post('/getShopInputMag2', async (req, res)=> {
	const result = await modelCall(shopinfoModel.getShopInputMag2, req);
	res.json(result);
}),
router.post('/ShopInputMagDocChk', async (req, res)=> {
	const result = await modelCall(shopinfoModel.ShopInputMagDocChk, req);
	res.json(result);
}),
router.post('/ShopInputMagArgeeChk', async (req, res)=> {
	const result = await modelCall(shopinfoModel.ShopInputMagArgeeChk, req);
	res.json(result);
}),
router.post('/ShopInputMageNaraChk', async (req, res)=> {
	const result = await modelCall(shopinfoModel.ShopInputMageNaraChk, req);
	res.json(result);
}),
router.post('/getShopArgeeMag', async (req, res)=> {
	const result = await modelCall(shopinfoModel.getShopArgeeMag, req);
	res.json(result);
}),

router.get('/shopgetEmail', async (req, res)=> {	
	const result = await modelCall(shopinfoModel.shopgetEmail, req);
	res.json(result);
}),
router.post('/postMailSend', async (req, res)=> {	
	const result = await modelCall(shopinfoModel.postMailSend, req);
	res.json(result);
}),

router.post('/ShopInputMag2Save', async (req, res)=> {	
	const result = await modelCall(shopinfoModel.ShopInputMag2Save, req);
	res.json(result);
}),



// 첨부파일 upload
router.patch('/attfiles/upload', async (req, res)=> {	
	const result = await modelCall(shopinfoModel.attfilesupload, req);
	res.json(result);
}),
// 첨부파일 delete
router.delete('/attfiles/delete/:i_shop/:i_id/:i_ser', async(req, res)=>{
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