/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-31 13:15:30
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-05 17:36:20
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path'
import * as fs from 'fs';
import * as moment from 'moment'
import { pump, mkdirp } from 'mz-modules'
import { Repository } from 'typeorm';
import { Upload } from './Upload.entity';

@Injectable()
export class UploadService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(Upload)
    private readonly upoladRepository: Repository<Upload>,
  ) { }

  // 获取所有文件
  async findAll(): Promise<Upload[]> {
    return await this.upoladRepository.find();
  }

  // 创建文件
  async create(files: Array<any>, data: any) {
    let fileArr = []
    for (const file of files) {
      console.log(file);
      console.log(file.filename, file.originalname);
      // 文件类型为img则存储img文件夹，否则存在file文件夹
      const file_type = file.mimetype;
      const imgReg = /image/gi;
      const upload_dir_type = imgReg.test(file_type) ? 'img' : 'file';
      const today = moment().format('YYYY-MM-DD');
      const relative_dir_path = `/public/${upload_dir_type}/${today}/`;
      const target_dir_path = join(__dirname, '../../..', relative_dir_path);
      await mkdirp(target_dir_path)
      let file_path = relative_dir_path + file.originalname
      let target_file_path = target_dir_path + file.originalname
      const pathBool = await fs.existsSync(target_file_path)
      let clientID = '';
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 8; i++) {
        clientID += possible.charAt((Math.random() * possible.length) | 0);
      }
      if (pathBool) {
        file_path = relative_dir_path + clientID + file.originalname
        target_file_path = target_dir_path + clientID + file.originalname
      }
      const writeMusicCover = fs.createWriteStream(target_file_path)
      writeMusicCover.write(file.buffer)
      // 存数据库
      let uploadData = new Upload();
      uploadData.name = pathBool ? clientID + file.originalname : file.originalname
      uploadData.type = upload_dir_type
      uploadData.path = file_path
      uploadData.pathLocal = target_file_path
      uploadData.pathUrl = 'http://node.wisdoms.xin' + file_path
      uploadData.size = file.size
      uploadData.createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      await this.upoladRepository.save(uploadData);
      delete uploadData.pathLocal
      delete uploadData.type
      fileArr.push(uploadData)
    }
    return files.length > 1 ? fileArr : fileArr[0]
  }

}
