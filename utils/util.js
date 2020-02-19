const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 获取小时
const formatHour = date => {
  const hour = date.getHours()
  return [hour].map(formatNumber)
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

function connectionFail(res) {
  console.log('通信失败公用处理');
}

function connectionComplete(res) {
  console.log('通信执行完成公共处理');
}

// dataObject示例
// const dataObject = {
//   trade: '1001',
//   data: {
//     userid: '1234',
//     name: 'tony',
//   }
// }

const doServerAction = dataObject => {
  wx.request({
    // url: 'https://git.siro-info.com:9777',
    url: 'https://www.liulinbo.com/a',
    data: {
      "Service": {
        "request": {
          "ServiceCode": "queue." + dataObject.trade,
          "body": dataObject.data,
        }
      }
    },
    header: {
      'content-type': 'application/json;charset=UTF-8',
      // 'charset': 'utf-8'
    },
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: dataObject.success,
    fail: res => {
      connectionFail(res);
      if (dataObject.fail !== undefined) {
        console.log('通信失败自定义处理');
        dataObject.fail(res);
      }
    },
    complete: res => {
      connectionComplete(res);
      if (dataObject.complete !== undefined){
        console.log('通信执行完成自定义处理');
        dataObject.complete(res);
      } 
    }
  })
}

module.exports = {
  formatTime: formatTime,
  formatHour: formatHour,
  formatDate: formatDate,
  doServerAction: doServerAction
}
