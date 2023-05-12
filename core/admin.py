from django import forms
from django.core.exceptions import NON_FIELD_ERRORS
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import Account

class AccountCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    email = forms.EmailField(label= 'email', widget=forms.EmailInput)
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)
    is_hotel_manager = forms.BooleanField(label= "Hotel manager", widget=forms.CheckboxInput)

    class Meta:
        model = Account
        fields = ['email', 'username']
        error_messages = {
            NON_FIELD_ERRORS: {
                'unique_together': "%(model_name)s's %(field_labels)s are not unique.",
            }
        }

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        user['is_hotel_manager'] = self.changed_data["is_hotel_manager"]
        if commit:
            user.save()
        return user

class AccountAdmin(
    BaseUserAdmin,
    admin.ModelAdmin,
    ):
    add_form = AccountCreationForm

    list_display = ('username', 'email', 'is_hotel_manager', 'last_login')
    list_editable = ('is_hotel_manager',)
    list_filter = ('is_hotel_manager',)
    search_fields = ('username', 'email',)
    ordering = ('email',)
    filter_horizontal = ()
    readonly_fields = ('last_login', 'date_joined')

admin.site.register(Account, AccountAdmin)
admin.site.unregister(Group)