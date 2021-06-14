const { product: { service } } = require('../resources');

describe('PRODUCT SERVICE TEST', () => {
  const users = [
    { name: 'Tryber Admin',
    email: 'tryber@trybe.com.br',
    password: '123456',
    role: 'administrator',
  },
    { name: 'testuser', email: 'user@test.com', password: 'test123', role: 'client' },
  ];

  it('Será validado que é possível listar todos os produtos estando autenticado', async () => {
    await service.getAll()
    .then((result) => {
      expect(result[0].id).toBe(1);
      expect(result[0].name).toBe('Skol Lata 250ml');
      expect(result[0].price).toBe('2.20');
      expect(result[0].url_image).toBe(
        'http://localhost:3001/images/Skol Lata 350ml.jpg',
      );
      expect(result[1].id).toBe(2);
      expect(result[1].name).toBe('Heineken 600ml');
      expect(result[1].price).toBe('7.50');
      expect(result[1].url_image).toBe('http://localhost:3001/images/Heineken 600ml.jpg');
      });
  });
});
