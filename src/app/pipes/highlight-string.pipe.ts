import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highLightString',
})
export class HighLightStringPipe implements PipeTransform {
  transform(value: string, highLightStr: string, className: string): string {
    const before = value.substring(0, value.indexOf(highLightStr));
    const after = value.substring(
      value.indexOf(highLightStr) + highLightStr.length
    );

    return `<span>${before}</span><span class="${className}" style="background-color: yellow;">${highLightStr}</span><span>${after}</span>`;
  }
}
