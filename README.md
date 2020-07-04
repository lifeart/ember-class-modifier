ember-class-modifier
==============================================================================

This `class` modifier made for declarative class management for DOM elements.

Why?

```hbs
    <div 
        class="
            ui flat item 
            {{if this.loading ' loading'}} 
            {{if this.hasErrors ' error'}}">
    </div>
```
To
```hbs
    <div {{class 'ui flat item'
        loading=this.loading
        error=this.hasErrors
    }}></div>
```

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

FastBoot support
------------------------------------------------------------------------------

Currently, modifiers don't work in FastBoot. To prevent "Blinking" you can add critical classes as standard `class` attribute. After modifier initialization it `node.classList` will be replaced.

```hbs
   <div 
        class="ui flat item"
        {{class 'ui flat item'
            loading=this.loading
            error=this.hasErrors
        }}>
    </div>
```

Installation
------------------------------------------------------------------------------

```
ember install ember-class-modifier
```

Usage
------------------------------------------------------------------------------

* Modifier rewrite all classes in element.

```hbs
<div {{class 'my-name'}}></div>
{{!-- Rendered AS: --}}
<div class="my-name"></div>
```

```hbs
<div {{class 'my-name' 'gold-color'}}></div>
{{!-- Rendered AS: --}}
<div class="my-name gold-color"></div>
```

```hbs
<div {{class my-name=false}}></div>
{{!-- Rendered AS: --}}
<div></div>
```
```hbs
<div {{class my-name=true}}></div>
{{!-- Rendered AS: --}}
<div class="my-name"></div>
```
```hbs
<div {{class 'red-dot' my-name=true}}></div>
{{!-- Rendered AS: --}}
<div class="red-dot my-name"></div>
```
```hbs
<div {{class (array 'class-one' 'class-two')}}></div>
{{!-- Rendered AS: --}}
<div class="class-one class-two"></div>
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
