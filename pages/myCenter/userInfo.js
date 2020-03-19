// pages/myCenter/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    showDialog: false,
    showWrap: 'info',
    toptips: { show: false, type:'', msg:'', time:0 }
    
  },

  //设置密码
  resetPwd(){
    this.setData({ showWrap:'resetPwd'})
  },
  //确认设置密码
  setPwdSbt(e){
    let oldPwd = e.detail.value.oldPwd
    let newPwd = e.detail.value.newPwd
    console.log(e.detail.value)
    if (oldPwd == '' || oldPwd == null){
      this.setData({ toptips: { show: true, type: 'error', msg: '请输入旧密码', time: 1500  }})
    } else if(oldPwd != newPwd){
      this.setData({ toptips: { show: true, type: 'error', msg: '两次输入不一致', time: 1500 } })
    } else if (newPwd == '' || newPwd == null){
      this.setData({ toptips: { show: true, type: 'error', msg: 请输入新密码, time: 1500 } })
    } else {
      // wx.request({
      //   url: '',
      //   data: {}
      // })
    }
  },
  //取消设置密码
  cancelReset(){
    this.setData({ showWrap: 'info' })
  },

  //退出登陆
  loginOut(){
    this.setData({ showDialog:true})
  },
  //退出登陆提示框
  loginOutDialog(e){
    if (e.detail.index == 1){
      //确认退出
      wx.removeStorage({
        key: 'userInfo',
        success: function(res) {
          wx.switchTab({
            url: '/pages/myCenter/myCenter'
          })
        },
      })
    } else {
      this.setData({ showDialog: false })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res.data)
        that.setData({userInfo:res.data})
      },
    })
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