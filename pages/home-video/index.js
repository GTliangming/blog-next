// pages/home-video/index.js
import { getTopMv } from "../../services/api-video";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    getTopMv(0).then(res=>{
      that.setData({topMVs:res.data.data})
    }).catch(err=>{
      console.log(err)
    })
  },
})