<template>
  <v-form
    @submit.prevent="submit"
  >
    <v-card max-width="700">
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.name"
              :label="$t('resources.leads.fields.name') + ' *'"
              type="text"
              :error-messages="form.errors.get('name')"
              name="name"
              required
            />
            <v-input
              v-model="form.status_id"
              hidden
              :error-messages="form.errors.get('status_id')"
              required
              name="status_id"
            />
            <v-text-field
              v-model="form.phone"
              v-mask="'+7(###)###-##-##'"
              :label="$t('resources.leads.fields.phone') + ' *'"
              prepend-icon="mdi-phone"
              type="text"
              :error-messages="form.errors.get('phone')"
              name="phone"
            />
            <v-text-field
              v-model="form.email"
              :label="$t('resources.leads.fields.email') + ' *'"
              prepend-icon="mdi-email"
              type="text"
              name="email"
              :error-messages="form.errors.get('email')"
              required
            />
            <v-textarea
              v-model="form.text"
              :label="$t('resources.leads.fields.text')"
              outlined
              counter
              name="text"
              :error-messages="form.errors.get('text')"
            />
            <v-textarea
              v-model="form.comment"
              :label="$t('resources.leads.fields.comment')"
              outlined
              counter
              :error-messages="form.errors.get('comment')"
              name="comment"
            />
            <!-- <label>{{ $t('resources.leads.fields.attachments') }}</label> -->
            <!-- <div v-for="attachment in form.attachments" :key="attachment.id">
              <a :href="attachment.url"
                 onmouseover="this.style.color='red';" onmouseout="this.style.color='#1976d2';">
                {{ attachment.file_name }}
              </a>
            </div> -->
          </v-col>
        </v-row>
        <v-select
          v-model="form.branch_id"
          :items="branches"
          :label="$t('resources.users.fields.branch') + ' *'"
          name="branch_id"
          :error-messages="form.errors.get('branch_id')"
          required
        />
      </v-card-text>
      <v-card-text>
        <label>{{ $t('resources.leads.fields.attachments') }}</label>
        <v-file-input
          v-for="(attachment, index) in form.attachments"
          :key="`attachment${index}`"
          v-model="form.attachments[index]"
          show-size
          truncate-length="50"
          :rules="attachmentRules"
          :error-messages="form.errors.get(`attachments.${index}`)"
        >
          <template #append-outer>
            <v-btn
              v-if="index > 0"
              color="error"
              icon
              @click="deleteAttachment(index)"
            >
              <v-icon dark>
                mdi-minus
              </v-icon>
            </v-btn>
            <v-btn
              color="success"
              icon
              :disabled="maxAttachments <= form.attachments.length"
              @click="addAttachment()"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
        </v-file-input>
        <div v-if="form.errors.get('attachments')" class="text--error">
          {{ form.errors.get('attachments') }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <base-cancel-button :to="{ name: 'leads.index' }" exact />
        <base-submit-button :form="form" />
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { size } from '../../../utils/validation'
import LeadDataService from '~/services/LeadDataService'
import UploadForm from '~/plugins/uploadForm'

export default {
  name: 'CreateLeadForm',
  props: {
    model: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      name: '',
      action: '',
      form: new UploadForm({
        name: '',
        created_at: '',
        status_id: '1',
        phone: '',
        email: '',
        text: '',
        comment: '',
        timezone: '',
        attachments: [null],
        branch_id: ''
      }),
      branches: [],
      maxAttachments: 10,
      attachmentRules: [size(10)]
    }
  },
  computed: {
  },
  created () {
    this.loading = true
    LeadDataService.create().then(data => this.init(data))
  },
  methods: {
    init (data) {
      this.branches = data.branches
      this.branches.unshift({ value: 0, text: 'Все филиалы' })
      this.action = data.action
    },
    addAttachment () {
      // console.log(this.maxAttachments)
      // console.log('123')
      if (this.form.attachments.length < this.maxAttachments) {
        this.form.attachments.push(null)
        this.form.errors.clear()
      }
    },
    deleteAttachment (index) {
      if (this.form.attachments.length > 1) {
        this.form.attachments.splice(index, 1)
        this.form.errors.clear()
      }
    },
    async submit () {
      try {
        if (this.method === 'put') {
          await this.form.put(this.action)
        } else {
          await this.form.post(this.action)
        }
        await this.$toast.success(this.$t('saved'))
        await this.$router.push({ name: 'leads.index' })
      } catch (err) {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          this.$toast.error(`${value}`)
        }
      }
    }
  }
}
</script>
