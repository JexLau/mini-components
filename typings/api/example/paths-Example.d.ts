
declare namespace Api {
  namespace ExampleExampleInfos {

    /**
    ** 接口名称: exampleInfos
    ** 接口地址: /api/exampleInfos/carouselExamples
    ** 请求方式: GET
    ** 接口描述: 
    */
    namespace AGetCarouselExamples {
      /** 请求 */
      interface Request {
        positionId?: string
        cityCode?: string
      }

      /** 响应 */
      interface Response {
        /** 业务状态码,200表业务操作成功 */
        code: number
        /** 友好提示内容 */
        message: string
        /** 业务状态码，true表操作成功，false表操作失败 */
        success: boolean
        /** 业务数据对像 */
        data: Api.ExampleComponent.ExampleVoListVo
      }
    }

  }
}