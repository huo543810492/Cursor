// index.js
Page({
  data: {
    inputText: '',
    imageUrl: '',
    isLoading: false,
    title: '',
    subtitle: ''
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

    const requestData = {
      workflow_id: '7476409451307745287',
      parameters: {
        input: this.data.inputText
      }
    };

    // 打印请求参数
    console.log('发送的请求数据:', {
      inputText: this.data.inputText,
      requestData: requestData
    });

    wx.request({
      url: 'https://api.coze.com/v1/workflow/run',
      method: 'POST',
      header: {
        'Authorization': 'Bearer pat_hhqzNxRO8smf7HCmPzKd1gy0gVLP8cOIdKHvtJlmxRhkcfTnfYkQrn3d0hh8S8uW',
        'Content-Type': 'application/json',
        'Host': 'api.coze.com',
        'Accept': '*/*',
        'Connection': 'keep-alive'
      },
      data: requestData,
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode === 200 && res.data && res.data.code === 0) {
          try {
            const responseData = JSON.parse(res.data.data);
            // 打印完整的响应数据
            console.log('完整的响应数据:', {
              statusCode: res.statusCode,
              responseData: responseData,
              rawData: res.data
            });
            this.setData({
              imageUrl: responseData.output,
            });
          } catch (error) {
            console.error('解析返回数据异常:', error);
            // 打印原始响应数据
            console.error('原始响应数据:', res.data);
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
          // 打印错误响应
          console.error('API错误响应:', {
            statusCode: res.statusCode,
            data: res.data
          });
        }
      },
      fail: (error) => {
        wx.hideLoading();
        wx.showToast({
          title: '网络请求异常',
          icon: 'none'
        });
        console.error('网络请求失败:', error);
      },
      complete: () => {
        this.setData({ isLoading: false })
      }
    });
  }
})
