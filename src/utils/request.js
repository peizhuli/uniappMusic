//同时发送异步代码的次数
import baseSetting from '../../public/baseUrl.js'

const request = (params) => {
    //在显示一个加载中的效果 微信的加载api功能
    //封装请求方法
    //const baseUrl="https://api.zbztb.cn/api/public/v1"
    return new Promise ((resolve,reject)=>{ /*resolve成功的回调函数  reject失败的回调函数*/
        uni.request({
            ...params,//传递过来的参数
			// header: {
			// 	cookie: uni.getStorageSync('cookie')
			// },
            url: baseSetting.url + params.url,
            success:(result)=>{
				// if (result.cookies && result.cookies.length) {
				// 	uni.setStorageSync('cookie', result.cookies[0]);
				// }
                resolve(result.data);
            },
            fail:(err)=>{
                reject(err)
            },
            complete:()=>{ //成功失败都执行的函数

            }
        });
          
    })
}
export default request