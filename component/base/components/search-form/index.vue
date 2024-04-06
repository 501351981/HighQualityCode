<template>
    <div class="search-form">
        <div class="search-form-fields">
            <div class="search-form-field" v-for="(field, index) in innerFields"
                 :key="field.key"
                 :style="{
                   width: field.width,
                   marginRight: index < fields.length - 1 ? gutter + 'px' : 0
                 }"
            >
                <span class="search-form-field-label"
                      :style="{
                              width: field.labelWidth,
                           }"
                >
                     <slot :name="`${field.key}-label`">{{ field.label }}：</slot>
                </span>

                <div class="search-form-field-component">
                    <slot :name="field.key" :formData="formData">
                        <component
                            :is="field.component"
                            size="mini"
                            v-model="formData[field.key]"
                            v-bind="field.componentProps"
                            v-on="field.componentEvents"
                            style="width: 100%"
                        />
                    </slot>
                </div>

            </div>
        </div>
        <div class="search-form-buttons">
            <el-button size="mini"
                       @click="resetFields"
            >重置
            </el-button>
            <el-button type="primary" size="mini"
                       @click="search"
            >查询
            </el-button>
        </div>
    </div>
</template>

<script>
import SearchFormSelect from "./SearchFormSelect";

export default {
    name: "SearchForm",
    props: {
        gutter: {
            type: Number,
            default: 20
        },
        labelWidth: {
            type: [String, Number]
        },
        fields: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            formData: {},
            componentsMap: {
                'input': 'el-input',
                'select': SearchFormSelect
            }
        };
    },
    computed: {
        defaultValues() {
            return this.fields.reduce((values, field) => {
                values[field.key] = field.defaultValue;
                return values;
            }, {});
        },
        innerFields() {
            return this.fields.map(field => {
                let width = '250px';
                if (field.width) {
                    width = typeof field.width === 'number' ? field.width + 'px' : field.width;
                }

                let labelWidth = undefined;
                if (this.labelWidth) {
                    labelWidth = typeof this.labelWidth === 'number' ? this.labelWidth + 'px' : this.labelWidth;
                }
                if (field.labelWidth) {
                    labelWidth = typeof field.labelWidth === 'number' ? field.labelWidth + 'px' : field.labelWidth;
                }
                let component = '';
                if (typeof field.component === 'string') {
                    component = this.componentsMap[field.component] || 'el-input';
                } else {
                    component = field.component;
                }
                return {
                    ...field,
                    width,
                    labelWidth,
                    component
                };
            });
        }
    },
    mounted() {
        this.formData = {...this.defaultValues};
    },
    methods: {
        search() {
            this.$emit('search', {...this.formData});
        },
        resetFields() {
            this.formData = {...this.defaultValues};
            this.$emit('search', {...this.formData});
        },
        getFields() {
            return {...this.formData};
        }
    }

};
</script>

<style scoped lang="less">
.search-form {
    display: flex;
    align-items: center;

    .search-form-fields {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 10px;

        .search-form-field {
            display: flex;
            align-items: center;

            .search-form-field-label {
                display: inline-block;
                text-align: right;
                margin-right: 4px;
            }

            .search-form-field-component {
                flex: 1;
            }
        }
    }
}
</style>