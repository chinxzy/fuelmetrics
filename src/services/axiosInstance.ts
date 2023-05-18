import axios from 'axios';

import localStorageService from '../services/localStorageService';


axios.defaults.headers.common['Authorization'] = 'Bearer:' + localStorageService.getItem('token');
