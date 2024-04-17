    // FUNÇÃO TEMA CLARO/ESCURO
    
    const cliqueTema = document.getElementById("claroEscuro");
    const body = document.querySelector("body");
    const imagemBotaoTrocaDeTema = document.querySelector(".iconeTema");
    const imagemLogoTrocaDeTema = document.querySelector(".logotipo");
    cliqueTema.addEventListener("click", () => {
      const modoEscuroAtivo = body.classList.contains("darkMode");
      body.classList.toggle("darkMode");
      if (modoEscuroAtivo) {
        imagemBotaoTrocaDeTema.setAttribute("src", "./src/img/botao-moon.png");
        imagemLogoTrocaDeTema.setAttribute("src", "./src/img/logo-3det-preto.png");
      } else {
        imagemBotaoTrocaDeTema.setAttribute("src", "./src/img/botao-sun.png");
        imagemLogoTrocaDeTema.setAttribute("src", "./src/img/logo-3det-branco.png");
      }
    });

    // FUNÇÃO UPAR PERSONAGEM

    // Função para marcar todos os checkboxes até o checkboxNumber
    function checkLevels(checkboxNumber) {
      for (let i = 1; i <= checkboxNumber; i++) {
        document.getElementById(`checkbox${i}`).checked = true;
      }
    }
    // Função para aumentar o nível
    function levelUp() {
      let allChecked = true;
      let checkboxes = document.querySelectorAll('.checkbox');
      checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
          allChecked = false;
        }
      });
      if (allChecked) {
        let currentLevel = parseInt(document.getElementById('levelInput').value);
        currentLevel++;
        document.getElementById('levelInput').value = currentLevel;
        checkboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
        showModal("<span class='modalTitulo'>Level UPA!</span><p>" + "Parabéns!<p>Você UPOU e agora tem +1pto para distribuir na ficha.");
      } else {
        showModal("<span class='modalTitulo'>Level UPA!</span><p>" + "Ainda lhe falta Experiência para UPAR!<p>1pto de Personagem custa 10xp.");
      }
    }

    // FUNÇÃO ALTERAR RECURSOS

    /* Selecionando os elementos */
    const poderInput = document.getElementById("poder");
    const habilidadeInput = document.getElementById("habilidade");
    const resistanceInput = document.getElementById("resistance");
    const paExtraInput = document.getElementById("paExtra");
    const pmExtraInput = document.getElementById("pmExtra");
    const pvExtraInput = document.getElementById("pvExtra");
    const paTotalLabel = document.getElementById("paTotal");
    const paAtualLabel = document.getElementById("paAtual");
    const pmTotalLabel = document.getElementById("pmTotal");
    const pmAtualLabel = document.getElementById("pmAtual");
    const pvTotalLabel = document.getElementById("pvTotal");
    const pvAtualLabel = document.getElementById("pvAtual");
    /* Atualizar Rótulos com Recursos Extras */
    function updateLabels() {
      const poderValue = parseInt(poderInput.value);
      const habilidadeValue = parseInt(habilidadeInput.value);
      const resistanceValue = parseInt(resistanceInput.value);
      /* Atualizando rótulos */
      const paTotal = poderValue + parseInt(paExtraInput.value) || 1;
      paTotalLabel.textContent = paTotal;
      paAtualLabel.textContent = document.getElementById("paAtual").value;
      const pmTotal = habilidadeValue * 5 + parseInt(pmExtraInput.value) || 1;
      pmTotalLabel.textContent = pmTotal;
      pmAtualLabel.textContent = document.getElementById("pmAtual").value;
      const pvTotal = resistanceValue * 5 + parseInt(pvExtraInput.value) || 1;
      pvTotalLabel.textContent = pvTotal;
      pvAtualLabel.textContent = document.getElementById("pvAtual").value;
    }
    /* Recarregar os rótulos de Recursos */
    updateLabels();
    /* Detectar alterações dos Atributos */
    poderInput.addEventListener("input", updateLabels);
    habilidadeInput.addEventListener("input", updateLabels);
    resistanceInput.addEventListener("input", updateLabels);
    paExtraInput.addEventListener("input", updateLabels);
    pmExtraInput.addEventListener("input", updateLabels);
    pvExtraInput.addEventListener("input", updateLabels);

    // FUNÇÃO REDUZIR RECURSOS

    function debitarRecurso(field) {
      var valor = prompt("Quantos Pontos serão reduzidos nesta ação?");
      if (valor !== null) {
        var input = document.getElementById(field);
        var newValue = parseInt(input.value) - parseInt(valor);
        if (newValue < 0) {
          alert("Seus Pontos não podem cair abaixo de ZERO!");
        } else {
          input.value = newValue;
          updateLabels();
        }
      }
    }

    // FUNÇÃO DESCANSO CURTO

    function descansoCurto() {
      var pmInput = document.getElementById("pmAtual");
      var pvInput = document.getElementById("pvAtual");
      var habilidadeValue = parseInt(document.getElementById("habilidade").value);
      var resistanceValue = parseInt(document.getElementById("resistance").value);
      var maxhabilidade = (parseInt(document.getElementById("habilidade").value) * 5) + parseInt(pmExtraInput.value);
      var maxResistance = (parseInt(document.getElementById("resistance").value) * 5) + parseInt(pvExtraInput.value);
      var currentPm = parseInt(pmInput.value);
      var currentPv = parseInt(pvInput.value);
      var updatedPm = currentPm + habilidadeValue;
      var updatedPv = currentPv + resistanceValue;
      pmInput.value = updatedPm <= maxhabilidade ? updatedPm : maxhabilidade;
      pvInput.value = updatedPv <= maxResistance ? updatedPv : maxResistance;
      updateLabels();
    }

    // FUNÇÃO DESCANSO LONGO

    function descansoLongo() {
      var poderValue = parseInt(document.getElementById("poder").value);
      var habilidadeValue = parseInt(document.getElementById("habilidade").value);
      var resistanceValue = parseInt(document.getElementById("resistance").value);
      var maxpoder = (parseInt(document.getElementById("poder").value)) + parseInt(paExtraInput.value);
      var maxhabilidade = (parseInt(document.getElementById("habilidade").value) * 5) + parseInt(pmExtraInput.value);
      var maxResistance = (parseInt(document.getElementById("resistance").value) * 5) + parseInt(pvExtraInput.value);
      document.getElementById("paAtual").value = maxpoder;
      document.getElementById("pmAtual").value = maxhabilidade;
      document.getElementById("pvAtual").value = maxResistance;
      updateLabels();
    }
  
    // FUNÇÃO EDITAR/SALVAR CARACTERÍSTICAS

    function toggleEdicao(botao) {
      var caracteristicas = botao.parentElement;
      var textoCapacidade = caracteristicas.querySelector('textarea');
      var pmCapacidade = caracteristicas.querySelector('input[type="number"]');
      if (textoCapacidade.readOnly) {
        textoCapacidade.readOnly = false;
        textoCapacidade.classList.remove('trava');
        pmCapacidade.readOnly = false;
        pmCapacidade.classList.remove('trava');

        botao.textContent = 'Salvar';
      } else {
        textoCapacidade.readOnly = true;
        textoCapacidade.classList.add('trava');
        pmCapacidade.readOnly = true;
        pmCapacidade.classList.add('trava');
        botao.textContent = 'Editar';
      }
    }

    // FUNÇÃO LANÇAR CARACTERÍSTICAS E GASTAR PM

    /* Exibir descritivo e debitar PM */
    function publicarConteudo(textarea, pmGastoInput, pmAtualInput, buttonId) {
      var conteudo = textarea.value;
      var pmGasto = parseInt(pmGastoInput.value);
      var pmAtual = parseInt(pmAtualInput.value);
      var buttonClicked = document.getElementById(buttonId).id;

      if (pmGasto > 0) {
        if (pmAtual >= pmGasto) {
          pmAtualInput.value = pmAtual - pmGasto;
          updateLabels();
          showModal("<span class='modalTitulo'>" + buttonClicked + "</span><p>" + conteudo + "<p>" + pmGasto + " PM gasto(s) dos seus Recursos!");
        } else {
          showModal("<span class='modalTitulo'>" + buttonClicked + "</span><p>" + "Você não tem PM suficiente para esta ação!");
        }
      } else {
        showModal("<span class='modalTitulo'>" + buttonClicked + "</span><p>" + "Você não especificou a quantidade de PM a ser gasta!");
      }
    }
    /* Inserindo os eventos Exibir no botão Chat */
    document.querySelectorAll('.publicar').forEach(function(botao) {
      botao.addEventListener('click', function() {
        var divPai = this.parentElement;
        var textarea = divPai.querySelector('textarea');
        var pmGastoInput = divPai.querySelector('input[type="number"]');
        var pmAtualInput = document.getElementById('pmAtual');
        var buttonId = this.id;
        publicarConteudo(textarea, pmGastoInput, pmAtualInput, buttonId);
      });
    });

    // FUNÇÃO ROLAR DADOS

    function rollDice(field) {
      var attributeName = "";
      /* Identifica o atributo rolado */
      switch(field) {
        case "poder":
          attributeName = "<span class='modalTitulo'>Teste de Poder</span><br>";
          break;
        case "habilidade":
          attributeName = "<span class='modalTitulo'>Teste de Habilidade</span><br>";
          break;
        case "resistance":
          attributeName = "<span class='modalTitulo'>Teste de Resistência</span><br>";
          break;
        default:
          attributeName = "Teste de Atributo";
      }
      var numberOfDice = parseInt(document.querySelector('input[name="dados"]:checked').value);
      var baseBonus = parseInt(document.getElementById(field).value);
      var tempBonus = parseInt(document.getElementById(field + "Temp").value);
      var critico = parseInt(document.getElementById(field + "Critico").value);
      var total = 0;
      var rolls = [];
      var criticalCount = 0; // Contador de críticos
      for (var i = 0; i < numberOfDice; i++) {
        var roll = Math.floor(Math.random() * 6) + 1;
        rolls.push(roll);
        if (roll >= critico) {
          criticalCount++; // Incrementa o contador de críticos
        }
        total += roll;
      }
      // Aplica o bônus base e o bônus temp
      total += (baseBonus + tempBonus) * (criticalCount + 1);
      var rollsText = rolls.join(', ');
      var bonusTotal = (baseBonus + tempBonus) * (criticalCount + 1);
      var result = attributeName + "<br>Rolagens: " + rollsText + "<br>Bônus Total: " + bonusTotal + "<br>Com Críticos: " + total;
      // Exibir o resultado em um modal
      showModal(result);
    }

    // FUNÇÃO JANELA MODAL

    /* Exibir modal com o conteúdo fornecido */
    function showModal(content) {
      var modal = document.createElement('div');
      modal.className = 'overlay';
      var modalContent = document.createElement('div');
      modalContent.className = 'modal';
      var closeButton = document.createElement('span');
      closeButton.className = 'close';
      closeButton.innerHTML = '&times;';
      closeButton.addEventListener('click', function() {
        modal.remove();
      });
      modalContent.appendChild(closeButton);
      var modalBody = document.createElement('div');
      modalBody.className = 'modalConteudo';
      modalBody.innerHTML = content;
      modalContent.appendChild(modalBody);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    }
    function showModal(content) {
      /* Criar o modal */
      var modal = document.createElement('div');
      modal.className = 'overlay';
      modal.addEventListener('click', function(event) {
        if (event.target === modal) {
          modal.remove();
        }
      });
      var modalContent = document.createElement('div');
      modalContent.className = 'modal';
      modalContent.innerHTML = '<div class="modalConteudo">' + content + '</div>';
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    }