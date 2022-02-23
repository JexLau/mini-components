
declare namespace Api {
  namespace ExampleComponent {
    /**  */
    interface ExampleInfoVo {
      bannerTitle?: string
      imageUrl?: string
      href?: string
      estateBsId?: string
      relation?: string
      page?: string
    }
    /**  */
    interface ExampleVoListVo {
      /** 请求的唯一key值 */
      unique?: string
      /**  */
      values?: Array<ExampleInfoVo>
      /** 数据总数 */
      total?: number
    }

  }
}
