import { DirectiveOptions, DirectiveFunction } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

const inserted: DirectiveFunction = (
  el: HTMLElement,
  binding: DirectiveBinding,
) => {
  console.log('inserted');
  console.log('binding: ', binding);
  el.addEventListener('input', binding.value);
};

const unbind: DirectiveFunction = (
  el: HTMLElement,
  binding: DirectiveBinding,
) => {
  console.log('unbind');
  el.removeEventListener('input', binding.value);
};

const bind: DirectiveFunction = () => {
  console.log('bind');
};

const update: DirectiveFunction = () => {
  console.log('update');
};

const componentUpdated: DirectiveFunction = () => {
  console.log('componentUpdated');
};

export const myExample = {
  inserted,
  unbind,
  bind,
  update,
  componentUpdated,
} as DirectiveOptions;
