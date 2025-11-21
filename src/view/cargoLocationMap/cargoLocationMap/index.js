import { Point } from '@/api/request/swagger'

export default {
  data() {
    return {}
  },
  methods: {
    YCResult(res) {
      let roadWayCodeList = res.result.map(item => item.roadWayCode)
      let noRepeatRoadWayCodeList = [...new Set(roadWayCodeList)]
      let data = []
      // console.log(res.result, 'res.result')
      //找出巷道的数据
      noRepeatRoadWayCodeList.forEach((item, index) => {
        let obj = {
          roadWayCode: item,
          objList0: {
            bigLeftListOut: [],
            bigLeftListIn: [],
            bigRightListOut: [],
            bigRightListIn: []
          },

        }

        res.result.forEach((jtem, jndex) => {
          /**
           *  (aBsize != 0) 找出正常货位 并打上标记  区分大小货位
           */
          obj.roadWayCodeFlage = jtem.aBsize
          /**
           * 左侧外 挨着巷道  大货位
           */
          if (jtem.roadWayDirection == 1 && jtem.locationType == 3) {
            obj.objList0.bigLeftListOut.push(jtem)
          }
          /**
           * 左侧里 大货位
           */
          if (jtem.roadWayDirection == 1 && jtem.locationType == 2) {
            obj.objList0.bigLeftListIn.push(jtem)
          }
          /**
           * 右侧外 挨着巷道 大货位 roadWayDirection ：2 （右侧）   locationType ：3 （挨着巷道）
           */
          if (jtem.roadWayDirection == 2 && jtem.locationType == 3) {
            obj.objList0.bigRightListOut.push(jtem)
          }
          /**
           * 右侧里 大货位  roadWayDirection ：2 （右侧）   locationType ：3 （不挨着巷道）
           */
          if (jtem.roadWayDirection == 2 && jtem.locationType == 2) {
            obj.objList0.bigRightListIn.push(jtem)
          }
        })
        // // //找到最大值
        // let maxRow = obj.objList0.bigLeftListOut.reduce((prev, current) => prev.columnNum > current.columnNum ? prev : current.columnNum)
        // this.maxRow = maxRow
        //默认高度
        let height = 35
        //距离顶部的距离
        let top = 5
        let left = 10
        for (let col = 0; col < obj.objList0.bigLeftListOut.length; col++) {
          obj.objList0.bigLeftListOut[col].top = obj.objList0.bigLeftListOut[col].columnNum * height + top
          obj.objList0.bigLeftListOut[col].className = this.getClass(obj.objList0.bigLeftListOut[col])
        }
        for (let col = 0; col < obj.objList0.bigLeftListIn.length; col++) {
          obj.objList0.bigLeftListIn[col].top = obj.objList0.bigLeftListIn[col].columnNum * height + top
          obj.objList0.bigLeftListIn[col].className = this.getClass(obj.objList0.bigLeftListIn[col])
        }
        for (let col = 0; col < obj.objList0.bigRightListOut.length; col++) {
          obj.objList0.bigRightListOut[col].top = obj.objList0.bigRightListOut[col].columnNum * height + top
          obj.objList0.bigRightListOut[col].className = this.getClass(obj.objList0.bigRightListOut[col])
        }
        for (let col = 0; col < obj.objList0.bigRightListIn.length; col++) {
          obj.objList0.bigRightListIn[col].top = obj.objList0.bigRightListIn[col].columnNum * height + top
          obj.objList0.bigRightListIn[col].className = this.getClass(obj.objList0.bigRightListIn[col])
        }
        // console.log(obj.objList0.bigLeftListOut)

        /**
         *排序
         */
        obj.objList0.bigLeftListOut.sort((a, b) => {
          return a.columnNum - b.columnNum
        })
        obj.objList0.bigLeftListIn.sort((a, b) => {
          return a.columnNum - b.columnNum
        })
        obj.objList0.bigRightListOut.sort((a, b) => {
          return a.columnNum - b.columnNum
        })
        obj.objList0.bigRightListIn.sort((a, b) => {
          return a.columnNum - b.columnNum
        })
        data.push(obj)
      })
      this.list = data
      // console.log(data, '处理后的数据')
    }
  }
}
