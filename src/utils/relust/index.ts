/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-22 15:11:31
 * @LastEditors: boide gui
 * @LastEditTime: 2020-12-31 16:44:41
 */
import { ApiProperty } from '@nestjs/swagger';
export interface IHttp<T = any> {
    header: any,
    config: any,
    request: any,
    data: {
        code: number,
        msg: string,
        data: T | null
    }
}

export type IHttpResult<T> = Promise<IHttp<T>>

export interface IHttpData<T = any> {
    code: number,
    msg: string,
    data: T
}
export class UserData {
  @ApiProperty({ description: '用户id,创建用户不传' })
  id?: number
  @ApiProperty({ description: '用户名' })
  name: string
  @ApiProperty({ description: '用户手机号' })
  phone?: string
  @ApiProperty({ description: '用户性别' })
  sex: number
}

export interface ICommonListContainer<T = any> {
    list: T[],
    pageNum: number,
    pageSize: number,
    pages: number,
    total: number,


    /*endRow?: number,
    firstPage?: number,
    hasNextPage?: boolean,
    hasPreviousPage?: boolean,
    isFirstPage?: boolean,
    isLastPage?: boolean,
    lastPage?: number,

    navigateFirstPage?: number,
    navigateLastPage?: number,
    navigatePages?: number,
    navigatepageNums?: any[],
    nextPage?: number,

    prePage?: number,
    size?: number,
    startRow?: number,*/

}


export interface IRulesItem {
    required?: boolean,
    msg?: string,
    trigger?: 'change' | 'blur',
    min?: number,
    max?: number,
    type?: 'array' | 'date' | 'string' | 'number',
    validator?: (rule: IRulesItem, value: string | number, cb: (error?: Error) => void) => void
}

export type IRules = { [key: string]: IRulesItem[] }
