// index.js
Page({
  data: {
    inputText: '',
    imageUrl: '',
    isLoading: false
  },

  handleInput(e) {
    this.setData({
      inputText: e.detail.value
    })
  },

  handleSubmit() {
    if (!this.data.inputText) {
      wx.showToast({
        title: '请输入文字描述',
        icon: 'none'
      })
      return
    }

    this.setData({ isLoading: true })

    wx.request({
      url: 'https://api.coze.com/v1/workflow/run',
      method: 'POST',
      header: {
        'Authorization': 'Bearer pat_hhqzNxRO8smf7HCmPzKd1gy0gVLP8cOIdKHvtJlmxRhkcfTnfYkQrn3d0hh8S8uW',
        'Content-Type': 'application/json',
        'Host': 'api.coze.com',
        'Connection': 'keep-alive'
      },
      data: {
        workflow_id: '7476409451307745287',
        parameters: {
          prompt: this.data.inputText
        }
      },
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode === 200 && res.data && res.data.code === 0) {
          try {
            const output = JSON.parse(res.data.data).output;
            this.setData({
              imageUrl: output
            });
          } catch (error) {
            console.error('解析返回数据异常:', error);
            wx.showToast({
              title: '解析返回数据异常',
              icon: 'none'
            });
          }
        } else {
          wx.showToast({
            title: '生成失败，请重试',
            icon: 'none'
          });
          console.error('工作流调用异常:', res.data);
        }
      },
      fail: (error) => {
        wx.hideLoading();
        wx.showToast({
          title: '网络请求异常',
          icon: 'none'
        });
        console.error('工作流调用异常:', error);
      },
      complete: () => {
        this.setData({ isLoading: false })
      }
    });
  }
})
