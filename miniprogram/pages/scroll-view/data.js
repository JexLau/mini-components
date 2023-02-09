"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gethouseData = void 0;
const list = [];
for (let index = 0; index < 100; index++) {
    list.push({
        projectName: `ProjectName${index + 1}`,
        area: "广东省",
        price: 100 * (index + 1),
        street: "深圳市"
    });
}
const gethouseData = async (params) => {
    const pageSize = params.pageSize || 20;
    const pageIndex = params.pageIndex || 1;
    return Promise.resolve({
        code: 200,
        message: "success",
        success: true,
        data: {
            values: list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
            total: 100
        }
    });
};
exports.gethouseData = gethouseData;
