import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
 
@Injectable()
export class FavoriteProvider {
    //also use to monitor downloaded content
    constructor(public storage: Storage) { }

    isFavorite(storageKey, itemId) {
        return this.getAllFavoriteItems(storageKey).then(result => {
            return result && result.indexOf(itemId) !== -1;
        });
    }

    favoriteItem(storageKey, itemId) {
        return this.getAllFavoriteItems(storageKey).then(result => {
            if (result) {
                result.push(itemId);
                return this.storage.set(storageKey, result);
            } else {
                return this.storage.set(storageKey, [itemId]);
            }
        });
    }

    unfavoriteItem(storageKey, itemId) {
        return this.getAllFavoriteItems(storageKey).then(result => {
            if (result) {
                var index = result.indexOf(itemId);
                result.splice(index, 1);
                return this.storage.set(storageKey, result);
            }
        });
    }

    unfavoriteAll(){
        return this.storage.clear();
    }

    getAllFavoriteItems(storageKey) {
        return this.storage.get(storageKey);
    }
    //set storageKey with only one item and overwrite any previous record
    favoriteAndOverwritePreviousItem(storageKey, item){
        return this.storage.set(storageKey, item);
    }
}