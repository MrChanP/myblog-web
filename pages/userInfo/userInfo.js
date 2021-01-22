let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imgPath: "http://47.116.65.132:80/bgImg",
    imgPath: "http://localhost:80/bgImg",
    userInfo: null,
    nowWrap: 'info',
    alertType: 'hide',
    alertMsg: ""
  },

  // 上传头像
  uploadHeadImg(){
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        let tempFile = res.tempFiles[0]
        if (tempFile.size < 2097152) {
          app.alert(_this, 'loading', "数据加载中", 0)
          wx.uploadFile({
            filePath: tempFile.path,
            name: 'upload_img_head',
            url: app.globalData.contextUrl + '/index/uploadHeadImg',
            formData: {
              'wxTokenId': app.globalData.wxTokenId
            },
            success (res) {
              console.log(res.data)
              let tmpData = JSON.parse(res.data)
              if(tmpData.code == 0) {
                app.globalData.userInfo.wxHead = tmpData.data
                _this.onShow()
              }
              app.alert(_this, 'hide')
            }
          })
        } else {
          app.alert(_this, "tip", "请上传小于2M大小的图片", 2000)
        }
      }
    })
  },

  // 设置密码
  resetPwd(){
    this.setData({ nowWrap:'resetPwd'})
  },

  // 确认设置密码
  setPwdSbt(e){
    let _this = this
    let oldPwd = e.detail.value.oldPwd
    let newPwd = e.detail.value.newPwd
    if (oldPwd == '' || oldPwd == null){
      app.alert(_this, "tip", "请输入旧密码", 2000)
      return
    }
    if(oldPwd != newPwd){
      app.alert(_this, "tip", "两次输入不一致", 2000)
      return
    }
    if (newPwd == '' || newPwd == null){
      app.alert(_this, "tip", "两次输入不一致", 2000)
      return
    }
    
  },

  // 取消设置密码
  cancelReset(){
    this.setData({ nowWrap: 'info' })
  },

  // 退出登陆
  loginOut(){
    app.alert(this, 'confirm', "确定退出吗？", 0)
  },

  // 退出登陆弹窗选择
  confirmResult(e){
    let _this = this
    if (e.currentTarget.dataset.type) {
      app.postRequest("/index/loginOut", 
      {id: app.globalData.userInfo.id},
      function(data){
        if (data.code == 0) {
          app.globalData.userInfo = null
          app.alert(_this, "tip", data.msg, 2000)
          setTimeout(function(){
            wx.redirectTo({
              url: '../index/index',
            })
          }, 2000)
        } else {
          app.alert(_this, "toast", data.msg, 0)
        }
      })
    } else {
      app.alert(this, 'hide')
    }
  },

  // 返回
  back(){
    if (this.data.nowWrap == 'resetPwd') {
      this.setData({ nowWrap: 'info' })
    } else {
      wx.navigateBack({
        delta: 0,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    app.setNavpos(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({ userInfo: app.globalData.userInfo })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})