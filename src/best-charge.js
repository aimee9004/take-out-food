function bestCharge(selectedItems) {
  let items = loadAllItems()
  let promotions = loadPromotions()
  let allStr = ''
  let orderDetailStr = `============= 订餐明细 =============\n`
  let promotionStr = `-----------------------------------\n
                      使用优惠:\n`
  for(let i = 0; i < selectedItems.length; i++) {
    let key = selectedItems[i].split('x')
    let obj = {
      num: key[1].trim(),
      price: null,
      name: ''
    }
    items.map(v => {
      if(key[0].trim() === v.id) {
        obj.price = v.price
        obj.name = v.name        
      }
    })
    // let promotionKey = key.filter(v => promotions.indexOf(v[0].trim()) !== -1)

    // let needSelItems = key.filter(v => {
    //   let firstVal = v[0].trim()
    //   let secondVal = v[1].trim()
    //   return {id: firstVal, num: secondVal, price: items.find(x => {if(x.id === firstVal) {return x.price}})}
    // })
    // console.log(needSelItems)

    orderDetailStr += showOrderDetail(obj.name, obj.num, obj.price)
  }

  allStr += orderDetailStr
  return allStr;
}

function showOrderDetail(name, num, price) {
  return `${name} x ${num} = ${num * price}元\n`
}
function showPromotion(type, nameStr, savePrice) {
  return `${type}${nameStr}，省${savePrice}`
}
function showtotalPrice(totalPrice) {
  return `
  -----------------------------------\n
  总计：${totalPrice}元\n
  ===================================`
}

// 获取所有类优惠型 计算他们的总价，显示对应优惠产品
// selItems={id: 'ITEM0001', num: '2'}
function getPromotionInfo(selItems, promotions) {
  let totalPrice = 0
  for(let i = 0; i < selItems.length; i++) {
    for(let j = 0; j < promotions.length; j++) {
      totalPrice += promotions.filter(v => {
        if(v.id === selItems[i].id) {
          return v.num * v.price
        }
      })
    }
  }
  return totalPrice
}
// function getNameStrs(keys) {
//   let str = ''
//   for(let i = 0; i < keys.length; i++) {
//     let name = items.filter(v => {
//       if(v.id === keys[i]) {
//         return v.name
//       }
//     })
//     str += name
//   }
//   return str
// }