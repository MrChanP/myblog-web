
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    toptips: { show: false, type: '', msg: '', time: 0 },
    loading: { show: false, msg: ''}
  },

  checkLogin() {
    let url = ""
    if(this.data.userInfo != null){
      url = "../myCenter/userInfo"
    } else {
      url = "../login/login"
    }
    wx.navigateTo({
      url: url
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ loading: { show: true, msg: '正在加载数据，请稍后' }})
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({ userInfo: res.data, loading: { show: false } })
      },
      fail() {
        console.log("缓存获取用户信息失败")
        wx.getStorage({
          key: 'sessionId',
          success: function (res) {
            //通过seesionId获取用户信息
            wx.request({
              url: 'http://localhost:8080/myblog/index/getUserInfo',
              data: { sessionId: res.data },
              success(res) {
                if (res.data.code == "0") {
                  wx.setStorage({
                    key: 'userInfo',
                    data: res.data.data,
                  })
                  that.setData({ userInfo: res.data.data })
                }
              },
              complete(){
                that.setData({ loading: { show: false } })
              }
            })
          },
        })
      }
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
    this.onLoad();
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