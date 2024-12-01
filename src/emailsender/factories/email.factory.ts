import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';


@Injectable()
export class EmailFactory {
  private templatesPath: string;
  constructor() {
    this.templatesPath = path.join(__dirname, '../templates/'); 
  }

  createForgetEmail(expireAt: string, yesLink: string, noLink: string, supportLink: string): string {
    let template: string;
    try {
      const templatePath = path.resolve(process.cwd(), 'src/emailsender/templates/forgetPassword.template.html');
      template =  fs.readFileSync(templatePath, 'utf8');
    } catch (error) {
      console.error('Error reading template file:', error);
      throw new Error('Failed to read email template');
    }

    template = template.replace(/{{EXPIREAT}}/g, expireAt);
    template = template.replace(/{{YES_LINK}}/g, yesLink);
    template = template.replace(/{{NO_LINK}}/g, noLink);
    template = template.replace(/YOUR_SUPPORT_LINK_HERE/g, supportLink);

    return template;
  }
}
