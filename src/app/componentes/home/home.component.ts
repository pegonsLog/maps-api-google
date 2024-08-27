import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('rua') rua!: ElementRef<HTMLInputElement>;
  @ViewChild('bairro') bairro!: ElementRef<HTMLInputElement>;
  @ViewChild('cidade') cidade!: ElementRef<HTMLInputElement>;
  @ViewChild('uf') uf!: ElementRef<HTMLInputElement>;
  @ViewChild('ibge') ibge!: ElementRef<HTMLInputElement>;


  ngAfterViewInit(): void {
    (window as any).meu_callback = this.meu_callback.bind(this);
  }


  pesquisacep(valor: string) {
    // Nova variável "cep" somente com dígitos.
    const cep = valor.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        // Preenche os campos com "..." enquanto consulta webservice.
        this.rua.nativeElement.value = '...';
        this.bairro.nativeElement.value = '...';
        this.cidade.nativeElement.value = '...';
        this.uf.nativeElement.value = '...';
        this.ibge.nativeElement.value = '...';

        // Cria um elemento javascript.
        const script = document.createElement('script');

        // Sincroniza com o callback.
        script.src =
          'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

        // Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);
      } else {
        // CEP é inválido.
        this.limpaFormularioCep();
        alert('Formato de CEP inválido.');
      }
    } else {
      // CEP sem valor, limpa formulário.
      this.limpaFormularioCep();
    }
  }

  meu_callback(conteudo: any) {
    if (!('erro' in conteudo)) {
      this.rua.nativeElement.value = conteudo.logradouro;
      this.bairro.nativeElement.value = conteudo.bairro;
      this.cidade.nativeElement.value = conteudo.localidade;
      this.uf.nativeElement.value = conteudo.uf;
      this.ibge.nativeElement.value = conteudo.ibge;
    } else {
      this.limpaFormularioCep();
      alert('CEP não encontrado.');
    }
  }

  limpaFormularioCep() {
    this.rua.nativeElement.value = '';
    this.bairro.nativeElement.value = '';
    this.cidade.nativeElement.value = '';
    this.uf.nativeElement.value = '';
    this.ibge.nativeElement.value = '';
  }

}
