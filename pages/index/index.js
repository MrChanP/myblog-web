Page({

    /**
     * 页面的初始数据
     */
    data: {
      userInfo: null,
      alert: "hide",
      alertMsg: ""
    },

  login() {
  //   wx.login(1000, {
  //     complete() {
  //       console.log("1")
  //     },
  //     success(res) {
  //       console.log(res)
  //       let that1 = that
  //       wx.request({
  //         url: 'http://localhost:8080/myblog/login',
  //         success(res) {
  //           that1.setData({ alert: "hide", userInfo: res.data.data })
  //         },
  //         fail() {
  //           that1.setData({ alert: "topLoading", alertMsg: "系统繁忙，加载失败" })
  //         }
  //       })
  //     },
  //     fail() {
  //       that.setData({ alert: "topLoading", alertMsg: "系统繁忙，加载失败" })
  //     }
  //   })
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // this.setData({ alert: "topLoading", alertMsg:"数据加载中" })
      // let that = this
      // wx.login({
      //   complete() {
      //     console.log("1")
      //   },
      //   success(res) {
      //     console.log(res)
      //     let that1 = that
      //     wx.request({
      //       url: 'http://localhost:8080/myblog/login',
      //       success(res) {
      //         that1.setData({ alert: "hide", userInfo: res.data.data })
      //       },
      //       fail() {
      //         that1.setData({ alert: "topLoading", alertMsg: "系统繁忙，加载失败" })
      //       }
      //     })
      //   },
      //   fail() {
      //     that.setData({ alert: "topLoading", alertMsg: "系统繁忙，加载失败" })
      //   }
      // })
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