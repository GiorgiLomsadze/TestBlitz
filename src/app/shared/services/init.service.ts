import { APIService } from './api.service';
import { ContentService } from './content.service';

export const loadApp = (apiService: APIService) => {
    return () => apiService.init().toPromise().catch(e => console.log(e));
};

export const loadContent = (content: ContentService) => {
    return () => content.init().toPromise().catch(e => console.log(e));
};
