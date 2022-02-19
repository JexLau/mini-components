const list: { projectName: string; area: string; price: number; street: string; }[] = []
for (let index = 0; index < 100; index++) {
  list.push({
    projectName: `ProjectName${index + 1}`,
    area: "广东省",
    price: 100 * (index + 1),
    street: "深圳市"
  })
}

export interface ListItem {
  projectName?: string
  area?: string
  street?: string
  price: number
}

export const gethouseData = async (params: { pageSize?: number; pageIndex?: number; }) => {
  const pageSize = params.pageSize || 20;
  const pageIndex = params.pageIndex || 1;
  return Promise.resolve({
    code: 200,
    message: "success",
    success: true,
    data: {
      values: list.slice(
        (pageIndex - 1) * pageSize,
        pageIndex * pageSize
      ),
      total: 100
    }
  })
}