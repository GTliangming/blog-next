const baseUrl = "http://123.207.32.32:9001";
class HYRequest {
  requset(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method,
        data: params,
        success: function (res) {
          resolve(res)
        },
        fail: function (err) {
          reject(err)
        }
      })
    })
  }
  get(url, params) {
    return this.requset(url, "GET", params)
  }
  post(url, data) {
    return this.requset(url, "POST", data)
  }
}
const hyRequest = new HYRequest()
export default hyRequest;