function bestCharge(selectedItems) {
  // 输入列举： ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"] 
  // ["ITEM0013 x 4", "ITEM0022 x 1"]
  // ["ITEM0013 x 4"]
  let items = loadAllItems()
  let promotions = loadPromotions()
  
  let itemTotalPrice = 0            // 计算未使用优惠总价
  let promotionOneTotalPrice = 0    // 使用优惠一 总价
  let promotionTwoTotalPrice = 0    // 使用优惠二 总价
  let lastTotalPrice = 0            // 最优惠总价
  let promotionItemIds = []
  for(let i = 0; i < selectedItems.length; i++) {
    let oneItemId = selectedItems[i].split('x')[0].trim()
    let oneItemNum = +selectedItems[i].split('x')[1].trim()
    let oneItemPrice = 0
    // 获取未使用优惠总价 当前遍历菜品价格
    for(let j = 0; j < items.length; j++) {
      if(oneItemId === items[j].id) {
        itemTotalPrice += items[j].price * oneItemNum
        oneItemPrice = items[j].price
      }
    }
    
    // 获取使用优惠二后总价
    let promotionItems = promotions[1].items
    let tag = true
    for(let x = 0; x < promotionItems.length; x++) {
      if(promotionItems[x] === oneItemId) {
        promotionItemIds.push(oneItemId)
        tag = false
        break;
      }
    }
    if(!!tag) {
      promotionTwoTotalPrice += oneItemPrice * oneItemNum
    }else {
      promotionTwoTotalPrice += (oneItemPrice / 2) * oneItemNum
    }
  }

  // 获取使用优惠一后总价
  if(itemTotalPrice >= 30) {
    promotionOneTotalPrice = itemTotalPrice - 6
  }else {
    promotionOneTotalPrice = itemTotalPrice
  }

  // console.log('-6后的：',promotionOneTotalPrice)
  // console.log('优惠菜品半价：', promotionTwoTotalPrice)
  if(promotionOneTotalPrice < promotionTwoTotalPrice) {
    lastTotalPrice = promotionOneTotalPrice
  }else {
    lastTotalPrice = promotionTwoTotalPrice
  }
  console.log('last price: ', lastTotalPrice)
  console.log('promition Ids: ', promotionItemIds)


  let orderDetailStr = `============= 订餐明细 =============\n`
  let promotionStr = `-----------------------------------\n使用优惠:\n`

  // 判断是否含有优惠菜品
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
    orderDetailStr += showOrderDetail(obj.name, obj.num, obj.price)
  }

  return orderDetailStr;
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


