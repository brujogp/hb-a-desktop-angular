import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'replace'})
export class ReplacePipe implements PipeTransform {
    transform(originalString: string, toReplace: string, replaceWith: string): string {
        return originalString.replace(toReplace, replaceWith);
    }
}
