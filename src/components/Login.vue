<template>
  <div class="box-card">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="70px" class="loginForm">
      <h1>后台管理</h1>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item class="verify" label="验证码" prop="code">
        <el-input v-model="ruleForm.code" />
        <div class="img-verify">
          <img :src="imageSrc" @click="changeKey" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, onMounted, onBeforeMount } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { getImage, login } from '../http/api.ts'
  const router = useRouter()
  const ruleFormRef = ref < FormInstance > ()
  const ruleForm = reactive({
    username: 'admin',
    password: '1234',
    code: '',
  })
  let imageSrc: string = ref('')
  const changeKey = async () => {
    return new Promise((resolve, reject) => {
      getImage().then((res) => {
        blobToBase64(res).then((base64) => {
          imageSrc.value = base64
          resolve(imageSrc)
        })
      })
    })

  }
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        resolve(e.target.result);
      };
      fileReader.readAsDataURL(blob);
      fileReader.onerror = () => {
        reject(new Error('blobToBase64 error'));
      };
    });
  }


  const rules = reactive < FormRules > ({
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' },
      { min: 3, max: 6, message: '长度在3~6之间', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 3, max: 6, message: '长度在3~6之间', trigger: 'blur' },
    ],
    code: [
      { required: true, message: '请输入验证码', trigger: 'blur' },
    ]
  })

  const submitForm = (formEl: FormInstance | undefined) => {
    let formData = new FormData();
    for (let key in ruleForm) {
      formData.append(key, ruleForm[key]);
    }
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        return new Promise((resolve, reject) => {
          login(formData).then(res => {
            if (res.code == 200) {
              sessionStorage.setItem('userName', ruleForm.username)
              sessionStorage.setItem('token', res.token)
              router.push({ path: '/' })
            }
            // console.log(res)

          }, error => {

          })
        })


      }
    })
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  onMounted(async () => {
    await changeKey()
  })
</script>

<style lang="scss" scoped>
  .box-card {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      text-align: center;
      margin: 20px;
    }

    .loginForm {
      height: 320px;
      width: 400px;
      border-radius: 10px;
      padding: 20px 35px;
      box-shadow: 0 0 25px #cac6c6;

      .verify {
        .img-verify {
          height: 40px;
          margin-left: 30px;
        }

        .el-input {
          width: 180px;
        }
      }

      .el-input {
        height: 40px;
      }

      .el-button {
        width: 150px;
        height: 45px;
      }
    }
  }
</style>