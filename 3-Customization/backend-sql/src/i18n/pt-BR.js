const ptBR = {
  app: {
    title: 'Biblioteca',
  },

  entities: {
    loan: {
      validation: {
        closedLoansSelectedForEmail:
          'Por favor selecione apenas empréstimos não finalizados.',
        returnDateRequired:
          'Data de Retorno é obrigatória.',
        bookOutOfStock:
          'Desculpe, o livro está fora de estoque.',
      },
    },
    book: {
      validation: {
        bookOutOfStock:
          'O número de cópias é menor do que o número de copias atuamente emprestadas.',
      },
    },
  },

  auth: {
    userDisabled: 'Sua conta está desativada',
    userNotFound: `Desculpe, não reconhecemos suas credenciais`,
    wrongPassword: `Desculpe, não reconhecemos suas credenciais`,
    weakPassword: 'Esta senha é muito fraca',
    emailAlreadyInUse: 'O email já está sendo usado',
    invalidEmail: 'Por favor forneça um email válido',
    passwordReset: {
      invalidToken:
        'Link de redefinição de senha inválido ou expirado',
      error: `Email não encontrado`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Link de verificação de email inválido ou expirado',
      error: `Email não encontrado`,
    },
  },

  iam: {
    errors: {
      userAlreadyExists: 'Usuário com este email já existe',
      userNotFound: 'Usuário não encontrado',
      disablingHimself: `Você não pode desativar-se`,
      revokingOwnPermission: `Você não pode revogar sua própria permissão de bibliotecário`,
    },
  },

  importer: {
    errors: {
      invalidFileEmpty: 'O arquivo está vazio',
      invalidFileExcel:
        'Apenas arquivos Excel (.xlsx) são permitidos',
      invalidFileUpload:
        'Arquivo inválido. Verifique se você está usando a última versão do modelo.',
      importHashRequired: 'Hash de importação é necessário',
      importHashExistent: 'Dados já foram importados',
    },
  },

  errors: {
    validation: {
      message: 'Ocorreu um erro',
    },
  },

  emails: {
    loan: {
      inProgress: {
        subject: `O livro {0} deve ser retornado em {1} dias`,
        body: `
          <p>Olá {3},</p>
          <p>Este é apenas um lembrete que você deve devolver o livro {1} para a {0} dentro dos próximos {2} dias.</p>
          <p>Obrigado,</p>
          <p>Equpe da {0}</p>
        `,
      },
      overdue: {
        subject: `O retorno do livro {0} está atrasado`,
        body: `
          <p>Olá {2},</p>
          <p>Por favor retorne o livro {1} para a {0} o mais breve possível.</p>
          <p>Obrigado,</p>
          <p>Equipe da {0}</p>
        `,
      },
    },
    invitation: {
      subject: `Você foi convidado para o app {0}`,
      body: `
        <p>Olá,</p>
        <p>Você foi convidado para o app {0}.</p>
        <p>Clique neste link para registrar-se.</p>
        <p><a href="{1}">{1}</a></p>
        <p>Obrigado,</p>
        <p>Equipe do app {0}</p>
      `,
    },
    emailAddressVerification: {
      subject: `Verifique seu e-mail do app {0}`,
      body: `
        <p>Olá,</p>
        <p>Clique neste link para verificar seu endereço de e-mail.</p>
        <p><a href='{0}'>{0}</a></p>
        <p>Se você não solicitou a verificação deste endereço, ignore este e-mail.</p>
        <p>Obrigado,</p>
        <p>Equipe do app {1}</p>
      `,
    },
    passwordReset: {
      subject: `Redefinir a senha do app {0}`,
      body: `
        <p>Olá,</p>
        <p>Clique neste link para redefinir a senha de login no app {0} com sua conta {1}.</p>
        <p><a href='{2}'>{2}</a></p>
        <p>Se você não solicitou a redefinição da sua senha, ignore este e-mail.</p>
        <p>Obrigado,</p>
        <p>Equipe do app {0}</p>
      `,
    },
  },
};

module.exports = ptBR;
