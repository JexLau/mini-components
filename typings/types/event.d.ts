declare namespace Mini {
    /** 小程序扩展 */
    namespace Wx {
      interface WxEventPublic<T> {
      }
  
      /**
       * bind:tap 事件的触发的元素值
       */
      interface TapEventDom<T = {}, D = {}> extends WxEventPublic<T> {
        /** 事件类型 */
        type: 'tap';
        /** 触摸事件 */
        changedTouches: Array<{
          clientX: number;
          clientY: number;
        }>
        /** 当前操作的元素 */
        currentTarget: {
          /** 元素中绑定的值 */
          dataset: T
          offsetLeft: number
          offsetTop: number
        };
        target: {
          dataset: T
        },
        detail: D
      }
      /**
      * bind:play 事件的触发的元素值
      */
      interface PlayEventDom<T = {}> extends WxEventPublic<T> {
        /** 事件类型 */
        type: 'play';
        /** 当前操作的元素 */
        currentTarget: {
          /** 元素中绑定的值 */
          dataset: T
          offsetLeft: number
          offsetTop: number
          id:string
        };
        target: {
          dataset: T
        }
      }
      /**
      * bind:pause 事件的触发的元素值
      */
      interface PauseEventDom<T = {}> extends WxEventPublic<T> {
        /** 事件类型 */
        type: 'pause';
        /** 当前操作的元素 */
        currentTarget: {
          /** 元素中绑定的值 */
          dataset: T
          offsetLeft: number
          offsetTop: number
          id:string
        };
        target: {
          dataset: T
        }
      }
      /**
       * bind:input 事件触发的元素值
       */
      interface InputEventDom<T = {}> extends WxEventPublic<T> {
        /** 事件类型 */
        type: 'input';
        /** 当前操作的元素 */
        currentTarget: {
          /** 元素中绑定的值 */
          dataset: T
        };
        target: {
          dataset: T
        },
        /** 详细的值 */
        detail: {
          /** 光标 */
          cursor: number,
          /** 键盘触发keyCode */
          keyCode: number,
          /** value值 */
          value: string
        }
      }
      /**
       * bind:input number-Input事件触发的元素值
       */
      interface NumberInputEventDom<T = {}> extends WxEventPublic<T> {
        /** 事件类型 */
        type: 'input';
        /** 当前操作的元素 */
        currentTarget: {
          /** 元素中绑定的值 */
          dataset: T
        };
        target: {
          dataset: T
        },
        /** 详细的值 */
        detail: {
          /** 光标 */
          cursor: number,
          /** 键盘触发keyCode */
          keyCode: number,
          /** value值 */
          value: number
        }
      }
      /**
       * bind:blur 事件触发的元素值
       */
      interface BlurEventDom<T = {}> extends WxEventPublic<T> {
        /** 事件类型 */
        type: 'blur';
        /** 当前操作的元素 */
        currentTarget: {
          /** 元素中绑定的值 */
          dataset: T
        };
        target: {
          dataset: T
        },
        /** 详细的值 */
        detail: {
          /** 光标 */
          cursor: number,
          /** value值 */
          value: string
        }
      }
      /**
       * bind:change 事件触发元素值
       */
      interface ChangeEventDom<T = {}, V = number[]> extends WxEventPublic<T> {
        /** 事件类型 */
        type: 'change';
        /** 当前操作的元素 */
        currentTarget: {
          /** 元素中绑定的值 */
          dataset: T
        };
        target: {
          dataset: T
        },
        /** 详细的值 */
        detail: {
          value: V
        }
      }
      /**
       * bind:xxx 绑定自定义事件
      */
      interface CustomEventDom<T = {}, D = {}> {
        /** 事件类型 */
        type: string;
        /** 当前操作的元素 */
        currentTarget: {
          /** 元素中绑定的值 */
          dataset: D
        };
        target: {
          dataset: D
        },
        /** 详细的值 */
        detail: T
      }
      /**
       * bind:columnchange picker选择器事件
      */
      interface ColumnChangeEventDom<T = {}> {
        /** 事件类型 */
        type: string;
        /** 当前操作的元素 */
        currentTarget: {
          /** 元素中绑定的值 */
          dataset: T
        };
        target: {
          dataset: T
        },
        /** 详细的值 */
        detail: {
          // 第几列
          column: number,
          // 第几行
          value: number
        }
      }
      /**
       * bind:confirm 事件的触发的元素值
       */
      interface ConfirmEventDom<T = {}> extends WxEventPublic<T> {
        /** 事件类型 */
        type: 'confirm';
        /** 当前操作的元素 */
        currentTarget: {
          /** 元素中绑定的值 */
          dataset: T
          offsetLeft: number
          offsetTop: number
        };
        detail: { value: string }
        target: {
          dataset: T
        }
      }
      /**
       * bind:markertap map组件事件的触发的元素值
       */
      interface MapMarkertapEventDom<T = {}> extends WxEventPublic<T> {
        /** 事件类型 */
        type: 'markertap';
        /** 当前操作的元素 */
        currentTarget: {
          /** 元素中绑定的值 */
          dataset: T
          offsetLeft: number
          offsetTop: number
        };
        target: {
          dataset: T
        };
        detail: {};
        markerId: number;
      }
      /**
       * bind:change swiper 事件触发的元素值
       */
      interface SwiperChangerEventDom<T = {}> extends WxEventPublic<T> {
        /** 事件类型 */
        type: 'change';
        /** 当前操作的元素 */
        currentTarget: {
          /** 元素中绑定的值 */
          dataset: T
          offsetLeft: number
          offsetTop: number
        };
        target: {
          dataset: T
        };
        detail: {
          /** 当前操作的指示器 */
          current: number
          /** 当前操作的子级id */
          currentItemId: string
          /** 触发的事件 */
          source: string
        };
      }
    }
  }
  