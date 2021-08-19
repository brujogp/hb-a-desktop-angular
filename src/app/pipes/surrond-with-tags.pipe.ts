import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'surrondWithTag'})
export class SurrondWithTagsPipe implements PipeTransform {
    /*    transform(value: any, ...args: any[]): any {
        }
     */
    transform(elementsToSurrond: string, tagHTML: string): string {
        const elementTemp1: string = elementsToSurrond.split('#').join('<' + tagHTML + ' class="test-class" src="https://cdn.heroclixbible.com/images/icons/');
        return elementTemp1.split('$').join('" >');
    }
}
