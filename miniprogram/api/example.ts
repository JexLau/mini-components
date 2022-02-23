import { Request } from "./request";

/**
** 接口名称: ExampleInfos
** 接口地址: /api/ExampleInfos/carouselExamples
** 请求方式: GET
** 接口描述: 
*/
export function GetExamplesList(data: Api.ExampleExampleInfos.AGetCarouselExamples.Request) {
  return Request<Api.ExampleExampleInfos.AGetCarouselExamples.Response>({
    url: `/api/ExampleInfos/carouselExamples`,
    method: 'GET',
    data,
    notAuth: true,
  })
}