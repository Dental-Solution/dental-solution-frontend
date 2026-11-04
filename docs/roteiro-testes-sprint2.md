Menu: abrir, fechar pelo botão, escolher um link e usar Escape.
Triagem: tentar avançar sem responder, avançar e voltar, revisar respostas, concluir e reiniciar.
Contato: testar campos vazios e dados válidos; deixar claro que a confirmação é local e não envia mensagem.
FAQ: abrir e fechar perguntas também pelo teclado.
Visual: conferir Mural e Equipe em 320, 390/480, 768 e 1440 px. Anote o navegador e a data do teste. Não descreva a triagem como diagnóstico e não diga que o formulário envia dados.
1.1 O que fazer
Deixar as fotos dos cinco integrantes mais leves para carregar, sem perder nitidez nem cortar os rostos.
Hoje os retratos são bem maiores do que o espaço em que aparecem nos cartões. A ideia é criar versões
WebP quadradas em dois tamanhos e deixar o navegador escolher qual carregar, conforme a tela.

Quando o menu do celular estiver aberto, permitir que a pessoa toque numa área vazia da página para 
fechá-lo. Hoje ele já abre pelo botão, fecha ao escolher um link e responde à tecla Escape; falta o fechamento 
ao tocar fora.

Como conferir:
Abra o site em largura móvel e abra o menu.
Toque na área vazia: o menu deve fechar e o botão deve voltar a indicar aria-expanded="false".
Toque dentro do menu: os links ainda devem funcionar.
Confira que o botão continua abrindo/fechando e que Escape ainda fecha e devolve o foco ao botão.
Confirme que a navegação desktop não foi afetada.
Não é preciso mudar cores nem redesenhar o menu — o objetivo é só esse comportamento novo

1.3 O que o verificador precisa conferir
Links e imagens locais (href e src) apontam para arquivos existentes. Ignore links da internet e âncoras como #secao.
As imagens têm alt.
Folhas de estilo e scripts locais citados nas páginas existem.
Quando encontrar problema, mostrar página e referência; retornar erro para o terminal. O script só verifica; não altera as páginas. Ele deve ser diferente do roteiro manual do Enzo: este confere a estrutura dos arquivos automaticamente.