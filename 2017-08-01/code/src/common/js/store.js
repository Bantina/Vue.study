/**
 * Created by bantina on 2017/8/1.
 */
// 通用的localStorage

/*
* 存储数据
* @id  id
* @key 字段
* @value 值
* */
export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__; //取得当前的localStorage.__seller__值
  if(!seller){ //首次进入时
    seller = {};
    seller[id] = {};
  }else {
    seller = JSON.parse(seller)
    if(!seller[id]){ //是否注册过该id
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  localStorage.__seller__ = JSON.stringify(seller);
};

/*
* 读取数据
* @def 默认值-读取不到时
* */
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__;
  if(!seller){ //__seller__  undefined
    return def;
  }
  seller = JSON.parse(seller)[id]; //转化为json对象
  if(!seller){ //没有id值
    return def;
  }
  let ret = seller[key];
  return ret || def;
};
