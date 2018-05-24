// 请把与index.html页面相关的javascript代码写在这里
// 同时删除该注释
function calculatePrice() {
  // 想办法调用`bestCharge`并且把返回的字符串
  // 显示在html页面的`message`中
  let currentItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
  let arr = document.getElementById('items').children
  console.log(arr)
  let inputItems = []
  for(let i = 0; i < arr.length; i++) {
    if(
      !!arr[i].value) {
        inputItems.push((`${arr[i].id} x ${arr[i].value}`))
      }
  }
  console.log(inputItems)
  // console.log(arr.reduce((acc, cur) => {
  //   if(!!cur.value) {
  //     acc.push(`${cur.id} x ${cur.value}`)
  //   }
  //   return acc
  // }, []))
  document.getElementById('message').innerHTML = bestCharge(inputItems)
  
}

function clear() {
  // 清除用户的选择，以及页面显示的信息
  // 清除之后，用户可以继续正常使用各项功能
}
+function() {
  let promotions = loadPromotions()
  let items = loadAllItems()
  let promotionsStr = `优惠信息：\n`
  let itemsStr = `菜品信息：\n`
  for(let i = 0; i < items.length; i++) {
    itemsStr += `${items[i].name}\t${items[i].price}元/份，` + `数量：<input id="${items[i].id}" type="number" />； ` 
  }

  for(let i = 0; i < promotions.length; i++) {
    if(i === 1) {
      promotionsStr += `${i}： (${getNameStr(promotions[i].items, items)})${promotions[i].type}\n`
    }else {
      promotionsStr += `${i}： ${promotions[i].type}\n`
    }
  }
  
  document.getElementById('items').innerHTML = itemsStr;
  document.getElementById('promotions').innerText = promotionsStr
}()