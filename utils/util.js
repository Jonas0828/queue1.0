const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [hour, minute, second].map(formatNumber).join(':')
}

const formatTimeOver = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [hour, minute, second].map(formatNumber)
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
  let month = date.getMonth() + 1
  let day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  };
  return year + '' + month + day
}

const formatDateOver = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

function connectionFail(res) {
  console.log('通信失败公用处理');
}

function connectionComplete(res) {
  console.log('通信执行完成公共处理');
}

const doServerAction = dataObject => {
  console.log(dataObject.appHdr.tradeCode, dataObject);
  let date = new Date();
  dataObject.appHdr.tmStamp = formatDateOver(date) + '.' + formatTime(date);
  dataObject.appHdr.tradeTime = formatTime(date);
  dataObject.appHdr.tradeDate = formatDate(date);
  dataObject.appHdr.reqtChannel = '10001';
  dataObject.appHdr.serialNo = formatDate(date) + Math.random().toString().substr(2, 8);
  dataObject.appHdr.branchNo = '6801';
  dataObject.appHdr.tellerNo = '888888';
  console.log('流水号', formatDate(date) + Math.random().toString().substr(2, 8));
  wx.request({
    // url: 'https://www.liulinbo.com/a',
    url: 'https://www.liulinbo.com/b',
    data: {
      "reqt": {
        "appHdr": dataObject.appHdr,
        "appBody": dataObject.appBody
      }
    },
    header: {
      'content-type': 'application/json;charset=UTF-8',
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
      if (dataObject.complete !== undefined) {
        console.log('通信执行完成自定义处理');
        dataObject.complete(res);
      }
    }
  })
}

const validateIdCard = idcard => {
  // 判断如果传入的不是一个字符串，则转换成字符串
  idcard = typeof idcard === 'string' ? idcard : String(idcard);
  //正则表达式验证号码的结构
  let regx = /^[\d]{17}[0-9|X|x]{1}$/;
  if (regx.test(idcard)) {
    // 验证前面17位数字，首先定义前面17位系数
    let sevenTeenIndex = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 截取参数前17位
    let front_seventeen = idcard.slice(0, 17);
    // 截取第18位
    let eighteen = idcard.slice(17, 18);
    // 这里如果是X要转换成小写，如果是数字在这里是字符串类型,则转换成数字类型，好做判断
    eighteen = isNaN(parseInt(eighteen)) ? eighteen.toLowerCase() : parseInt(eighteen);
    // 定义一个变量计算系数乘积之和余数
    let remainder = 0;
    //利用循环计算前17位数与系数乘积并添加到一个数组中
    // charAt()类似数组的访问下标一样，访问单个字符串的元素,返回的是一个字符串因此要转换成数字
    for (let i = 0; i < 17; i++) {
      remainder = (remainder += parseInt(front_seventeen.charAt(i)) * sevenTeenIndex[i]) % 11;
    }
    //余数对应数字数组
    let remainderKeyArr = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    // 取得余数对应的值
    let remainderKey = remainderKeyArr[remainder] === 'X' ? remainderKeyArr[remainder].toLowerCase() : remainderKeyArr[remainder];
    console.log(remainderKey);
    console.log(eighteen)
    // 如果最后一位数字对应上了余数所对应的值，则验证合格，否则不合格,
    // 由于不确定最后一个数字是否是大小写的X，所以还是都转换成小写进行判断
    if (eighteen === remainderKey) {
      return idcard;
    } else {
      console.log('你输入的身份证号码格式不对!')
    }
  } else {
    console.log('你输入的身份证号码格式不对,请重新输入!')
  }
}

module.exports = {
  formatTime: formatTime,
  formatHour: formatHour,
  formatDate: formatDate,
  doServerAction: doServerAction,
  validateIdCard: validateIdCard,
  formatTimeOver: formatTimeOver
}