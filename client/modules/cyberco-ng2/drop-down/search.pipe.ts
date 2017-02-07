import { Pipe, Injectable, PipeTransform } from "@angular/core";

@Pipe({
    name: 'search'
})
@Injectable()
export class SearchPipe implements PipeTransform {
    transform(items, search: string): any {
        return items.filter(item => {
            if (!search) {
                return item.value;
            }

            return item.value.toString().toLowerCase().indexOf(search.toString().toLowerCase()) > -1;
        });
    }
}
