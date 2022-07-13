import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  url: process.env.REACT_APP_URL_BE 
}