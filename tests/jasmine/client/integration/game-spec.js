describe('Accessing the website', function () {

  it('should display the new question card', function () {
    expect($('.question-card').size()).toBe(1);
    expect($('#new_answer').length).toBe(1);
  });

  it('should display the answers box', function () {
    expect($('.answers').size()).toBe(1);
  });

});