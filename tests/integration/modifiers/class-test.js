import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | class', function(hooks) {
  setupRenderingTest(hooks);

  test('it basically works', async function(assert) {
    assert.expect(1);

    await render(
      hbs`<button {{class 'foo'}}></button>`
    );
    assert.dom('.foo').exists();
  });

  test('it support multiple classes', async function(assert) {
    assert.expect(1);

    await render(
      hbs`<button {{class 'foo' 'bar'}}></button>`
    );
    assert.dom('.foo.bar').exists();
  });

  test('it support multiple classes as arrays', async function(assert) {
    assert.expect(1);

    await render(
      hbs`<button {{class (array 'foo' 'bar')}}></button>`
    );
    assert.dom('.foo.bar').exists();
  });

  test('it support dynamic classses as array arguments', async function(assert) {
    assert.expect(3);
    this.set('dynamicName', 'foo');

    await render(
      hbs`<button {{class (array this.dynamicName 'bar')}}></button>`
    );
    assert.dom('.foo.bar').exists();
    this.set('dynamicName', 'zoo');
    assert.dom('.zoo.bar').exists();
    assert.dom('.foo.bar').doesNotExist();
  });


  test('it support dynamic classses', async function(assert) {
    assert.expect(3);
    this.set('dynamicName', 'foo');
    await render(
      hbs`<button {{class this.dynamicName 'bar'}}></button>`
    );
    assert.dom('.foo.bar').exists();
    this.set('dynamicName', 'zoo');
    assert.dom('.zoo.bar').exists();
    assert.dom('.foo.bar').doesNotExist();
  });
  [undefined, null, NaN, Infinity, true, false].forEach((el) => {
    const sEl = String(el);
    test(`it accept only numbers and strings as class names: ${sEl}`, async function(assert) {
        assert.expect(2);
        this.set('dynamicName', sEl);
        await render(
          hbs`<button {{class this.dynamicName}}></button>`
        );
        assert.dom('.' + sEl).exists();
        this.set('dynamicName', el);
        assert.dom('button').doesNotHaveClass(sEl);
    });
  });
  test('it support hashed classes', async function(assert) {
    assert.expect(2);
    this.set('showMyClass', true);
    await render(
      hbs`<button {{class my-class=this.showMyClass}}></button>`
    );
    assert.dom('.my-class').exists();
    this.set('showMyClass', false);
    assert.dom('.my-class').doesNotExist();
  });
  test('it support positional and hashed classes', async function(assert) {
    assert.expect(4);
    this.set('showMyClass', true);
    this.set('dynamicClass', 'my-dynamic');
    await render(
      hbs`<button {{class this.dynamicClass my-class=this.showMyClass}}></button>`
    );
    assert.dom('.my-class').exists();
    assert.dom('.my-dynamic').exists();
    this.set('showMyClass', false);
    assert.dom('.my-class').doesNotExist();
    assert.dom('.my-dynamic').exists();
  });
  test('it always sort classes', async function(assert) {
    assert.expect(1);
    await render(
      hbs`<button test-button {{class 'dd' 'bb' 'ee' 'aa' 'cc'}}></button>`
    );
    assert.equal(document.querySelector('button[test-button]').classList.value, 'aa bb cc dd ee');
  });
});