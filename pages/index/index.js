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

    // TODO: 这里将来需要替换为实际的 coze API 调用
    // 示例代码：
    setTimeout(() => {
      this.setData({
        imageUrl: 'https://example.com/sample-image.jpg',
        isLoading: false
      })
    }, 1000)
  }
})
