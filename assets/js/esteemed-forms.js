/**
 * Esteemed.io Forms - Self-contained form renderer and submission handler.
 * No external dependencies required.
 *
 * Usage: Add a container element with data-esteemed-form="formId" attribute.
 * Optional: data-form-api="https://..." to override the submission endpoint.
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Form definitions (extracted from Drupal webform configs)
  // ---------------------------------------------------------------------------

  var FORM_DEFINITIONS = {
    contact: {
      title: 'Contact Us',
      submitLabel: 'Send message',
      fields: [
        { name: 'name', type: 'text', label: 'Your Name', required: true },
        { name: 'email', type: 'email', label: 'Your Email', required: true },
        { name: 'subject', type: 'text', label: 'Subject', required: true },
        { name: 'message', type: 'textarea', label: 'Message', required: true }
      ]
    },
    enterprise_staffing: {
      title: 'Talk to an Enterprise Staffing Expert',
      submitLabel: 'Submit',
      fields: [
        { name: 'first_name', type: 'text', label: 'First Name', placeholder: 'First Name', required: true, halfWidth: true },
        { name: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Last Name', required: true, halfWidth: true },
        { name: 'business_email', type: 'email', label: 'Business Email', placeholder: 'Business email', required: true },
        { name: 'country', type: 'select', label: 'Country', required: true, options: ['United States', 'Canada', 'United Kingdom', 'Australia', 'Other'] },
        { name: 'state', type: 'text', label: 'State/Province', placeholder: 'State/Province' },
        { name: 'phone', type: 'tel', label: 'Phone', placeholder: 'Phone', required: true },
        { name: 'company_name', type: 'text', label: 'Company Name', placeholder: 'Company name', required: true },
        { name: 'business_size', type: 'select', label: 'Business Size', required: true, options: ['1-49 Employees', '50-999 Employees', '1000+ Employees'] },
        { name: 'functional_role', type: 'select', label: 'Functional Role', required: true, options: ['Information Technology', 'Operations', 'Human Resources', 'Finance', 'Marketing', 'Payroll', 'Procurement / Supply Chain', 'Other'] },
        { name: 'job_level', type: 'select', label: 'Job Level', required: true, options: ['C-Level', 'Vice President', 'Director', 'Manager', 'Individual Contributor'] },
        { name: 'area_of_interest', type: 'checkboxes', label: 'Area of Interest (Choose all that apply)', options: ['Staffing Solutions', 'Managed Services', 'Software Solutions', 'Employee Experience'] }
      ]
    },
    career_snapshot: {
      title: 'Career Snapshot',
      submitLabel: 'Submit',
      fields: [
        { name: 'first_name', type: 'text', label: 'First Name', required: true, halfWidth: true },
        { name: 'last_name', type: 'text', label: 'Last Name', required: true, halfWidth: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'website_url', type: 'url', label: 'Website URL' },
        { name: 'phone', type: 'tel', label: 'Phone Number', required: true },
        { name: 'career_stage', type: 'select', label: 'What stage of career do you consider yourself?', required: true, options: ['Executive', 'Mid Career', 'Early Career'] },
        { name: 'three_year_vision', type: 'textarea', label: 'Briefly describe where you see yourself in 3 years.' }
      ]
    },
    coach_application: {
      title: 'Become a Coach',
      submitLabel: 'Submit Your Application',
      fields: [
        { name: 'first_name', type: 'text', label: 'First Name', required: true, halfWidth: true },
        { name: 'last_name', type: 'text', label: 'Last Name', required: true, halfWidth: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'website_url', type: 'url', label: 'Website URL' },
        { name: 'phone', type: 'tel', label: 'Phone Number', required: true },
        { name: 'coaching_services', type: 'select', label: 'What type of coaching services do you offer?', required: true, options: ['1-1 Online Coaching', 'Individual Learning Courses', 'Cohort Learning Sessions', 'Resume Writing', 'Interview Preparation', 'Other'] },
        { name: 'coaching_business', type: 'textarea', label: 'How would you best describe your coaching business today?' },
        { name: 'career_level', type: 'select', label: 'What career level do you cater to?', required: true, options: ['Executive', 'Mid Career', 'Early Career'] }
      ]
    },
    find_coach_application: {
      title: 'Find a Coach',
      submitLabel: 'Submit',
      fields: [
        { name: 'first_name', type: 'text', label: 'First Name', required: true, halfWidth: true },
        { name: 'last_name', type: 'text', label: 'Last Name', required: true, halfWidth: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'website_url', type: 'url', label: 'Website URL' },
        { name: 'phone', type: 'tel', label: 'Phone Number', required: true },
        { name: 'coaching_interest', type: 'select', label: 'Choose coaching services that interest you?', required: true, options: ['1-1 Online Coaching', 'Individual Learning Courses', 'Cohort Learning Sessions', 'Resume Writing', 'Interview Preparation', 'Other'] },
        { name: 'coaching_experience', type: 'textarea', label: 'How would you best describe your experience with Career Coaching in the past?' },
        { name: 'career_stage', type: 'select', label: 'What stage of career do you consider yourself?', required: true, options: ['Executive', 'Mid Career', 'Early Career'] }
      ]
    },
    partner_application: {
      title: 'Partner Application',
      submitLabel: 'Apply',
      fields: [
        { name: 'first_name', type: 'text', label: 'First Name', required: true, halfWidth: true },
        { name: 'last_name', type: 'text', label: 'Last Name', required: true, halfWidth: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'website_url', type: 'url', label: 'Website URL' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'partnership_type', type: 'select', label: 'What type of partnership are you interested in?', required: true, options: ['Agency', 'Talent Channel Partner', 'Software Channel Partner'] },
        { name: 'partnering_needs', type: 'textarea', label: 'How would you best describe your partnering needs?' }
      ]
    },
    u_s_personal_join_esteemed: {
      title: 'Join Esteemed',
      submitLabel: 'Submit',
      fields: [
        { name: 'first_name', type: 'text', label: 'First Name', placeholder: 'First Name', required: true, halfWidth: true },
        { name: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Last Name', required: true, halfWidth: true },
        { name: 'business_email', type: 'email', label: 'Business Email', placeholder: 'Business email', required: true },
        { name: 'country', type: 'select', label: 'Country', required: true, options: ['United States', 'Canada', 'United Kingdom', 'Australia', 'Other'] },
        { name: 'state', type: 'text', label: 'State/Province', placeholder: 'State/Province' },
        { name: 'phone', type: 'tel', label: 'Phone', placeholder: 'Phone', required: true },
        { name: 'company_name', type: 'text', label: 'Company Name', placeholder: 'Company name', required: true },
        { name: 'membership_plan', type: 'select', label: 'Choose your membership plan', required: true, options: ['Basic ($29.95/mo)', 'Advanced ($39.95/mo)', 'Premium ($59.95/mo)'] }
      ]
    },
    u_s_personal_get_benefits: {
      title: 'Get Benefits',
      submitLabel: 'Submit',
      fields: [
        { name: 'first_name', type: 'text', label: 'First Name', placeholder: 'First Name', required: true, halfWidth: true },
        { name: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Last Name', required: true, halfWidth: true },
        { name: 'business_email', type: 'email', label: 'Business Email', placeholder: 'Business email', required: true },
        { name: 'country', type: 'select', label: 'Country', required: true, options: ['United States', 'Canada', 'United Kingdom', 'Australia', 'Other'] },
        { name: 'state', type: 'text', label: 'State/Province', placeholder: 'State/Province' },
        { name: 'phone', type: 'tel', label: 'Phone', placeholder: 'Phone', required: true },
        { name: 'company_name', type: 'text', label: 'Company Name', placeholder: 'Company name', required: true }
      ]
    },
    join_agents_waitlist: {
      title: 'Join Agents Waitlist',
      submitLabel: 'Submit',
      fields: [
        { name: 'first_name', type: 'text', label: 'First Name', placeholder: 'First Name', required: true, halfWidth: true },
        { name: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Last Name', required: true, halfWidth: true },
        { name: 'business_email', type: 'email', label: 'Business Email', placeholder: 'Business email', required: true },
        { name: 'company_name', type: 'text', label: 'Company Name', placeholder: 'Company name' }
      ]
    },
    branch_operator_getting_to_know: {
      title: 'Getting to Know You',
      submitLabel: 'Submit',
      fields: [
        { name: 'first_name', type: 'text', label: 'First Name', placeholder: 'First Name', required: true, halfWidth: true },
        { name: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Last Name', required: true, halfWidth: true },
        { name: 'business_email', type: 'email', label: 'Business Email', placeholder: 'Business email', required: true },
        { name: 'company_name', type: 'text', label: 'Company Name', placeholder: 'Company name', required: true },
        { name: 'phone', type: 'tel', label: 'Phone', placeholder: 'Phone', required: true }
      ]
    }
  };

  // Sales base fields shared by multiple forms
  var SALES_BASE_FIELDS = [
    { name: 'first_name', type: 'text', label: 'First Name', placeholder: 'First Name', required: true, halfWidth: true },
    { name: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Last Name', required: true, halfWidth: true },
    { name: 'business_email', type: 'email', label: 'Business Email', placeholder: 'Business email', required: true },
    { name: 'country', type: 'select', label: 'Country', required: true, options: ['United States', 'Canada', 'United Kingdom', 'Australia', 'Other'] },
    { name: 'state', type: 'text', label: 'State/Province', placeholder: 'State/Province' },
    { name: 'phone', type: 'tel', label: 'Phone', placeholder: 'Phone', required: true },
    { name: 'company_name', type: 'text', label: 'Company Name', placeholder: 'Company name', required: true },
    { name: 'business_size', type: 'select', label: 'Business Size', required: true, options: ['1-49 Employees', '50-999 Employees', '1000+ Employees'] },
    { name: 'message', type: 'textarea', label: 'How can we help?' }
  ];

  var salesForms = {
    u_s_sales_enterprise_managed_ser: 'Enterprise Managed Services',
    u_s_sales_smb_managed_services: 'Small Business Managed Services',
    u_s_sales_enterprise_human_resou: 'Enterprise Human Resources',
    u_s_sales_enterprise_software: 'Enterprise Software',
    u_s_sales_smb_human_resources: 'Small Business Human Resources',
    u_s_sales_team_contact: 'Sales Team Contact',
    u_s_small_business_join_esteemed: 'Join Esteemed for Business'
  };

  Object.keys(salesForms).forEach(function (key) {
    FORM_DEFINITIONS[key] = {
      title: salesForms[key],
      submitLabel: 'Submit',
      fields: SALES_BASE_FIELDS
    };
  });

  // ---------------------------------------------------------------------------
  // Style constants
  // ---------------------------------------------------------------------------

  var STYLES = {
    wrapper: 'max-width:600px;margin:0 auto;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;',
    label: 'display:block;font-weight:600;margin-bottom:4px;font-size:14px;color:#374151;',
    requiredStar: 'color:#dc2626;margin-left:2px;',
    input: 'width:100%;padding:10px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;margin-bottom:16px;box-sizing:border-box;font-family:inherit;',
    halfWidthLeft: 'display:inline-block;width:calc(50% - 8px);vertical-align:top;margin-right:16px;',
    halfWidthRight: 'display:inline-block;width:calc(50% - 8px);vertical-align:top;',
    fieldWrapper: 'margin-bottom:0;',
    button: 'width:100%;padding:12px;background:#1e3a5f;color:#ffffff;border:none;border-radius:6px;font-size:16px;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.2s;',
    buttonDisabled: 'width:100%;padding:12px;background:#6b7280;color:#ffffff;border:none;border-radius:6px;font-size:16px;font-weight:600;cursor:not-allowed;font-family:inherit;',
    success: 'padding:20px;background:#ecfdf5;border:1px solid #6ee7b7;border-radius:8px;color:#065f46;text-align:center;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;',
    error: 'padding:20px;background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;color:#991b1b;margin-top:12px;',
    checkboxGroup: 'margin-bottom:16px;',
    checkboxItem: 'display:block;margin-bottom:8px;font-size:14px;color:#374151;cursor:pointer;',
    checkboxInput: 'margin-right:8px;cursor:pointer;'
  };

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  function getUTMParams() {
    var params = {};
    var search = window.location.search;
    if (!search) return params;
    var urlParams = new URLSearchParams(search);
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function (key) {
      var val = urlParams.get(key);
      if (val) params[key] = val;
    });
    return params;
  }

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ---------------------------------------------------------------------------
  // Field rendering
  // ---------------------------------------------------------------------------

  function renderLabel(field) {
    var html = '<label style="' + STYLES.label + '" for="ef-' + field.name + '">';
    html += escapeHTML(field.label);
    if (field.required) {
      html += '<span style="' + STYLES.requiredStar + '" aria-hidden="true">*</span>';
    }
    html += '</label>';
    return html;
  }

  function renderField(field) {
    var html = '';
    var id = 'ef-' + field.name;
    var placeholder = field.placeholder ? ' placeholder="' + escapeHTML(field.placeholder) + '"' : '';
    var required = field.required ? ' required' : '';

    if (field.type === 'textarea') {
      html += renderLabel(field);
      html += '<textarea id="' + id + '" name="' + field.name + '" style="' + STYLES.input + 'min-height:100px;resize:vertical;"' + placeholder + required + '></textarea>';
    } else if (field.type === 'select') {
      html += renderLabel(field);
      html += '<select id="' + id + '" name="' + field.name + '" style="' + STYLES.input + 'appearance:auto;"' + required + '>';
      html += '<option value="">-- Select --</option>';
      field.options.forEach(function (opt) {
        html += '<option value="' + escapeHTML(opt) + '">' + escapeHTML(opt) + '</option>';
      });
      html += '</select>';
    } else if (field.type === 'checkboxes') {
      html += '<div style="' + STYLES.checkboxGroup + '">';
      html += '<label style="' + STYLES.label + 'margin-bottom:8px;">' + escapeHTML(field.label) + '</label>';
      field.options.forEach(function (opt) {
        html += '<label style="' + STYLES.checkboxItem + '">';
        html += '<input type="checkbox" name="' + field.name + '" value="' + escapeHTML(opt) + '" style="' + STYLES.checkboxInput + '">';
        html += escapeHTML(opt);
        html += '</label>';
      });
      html += '</div>';
    } else {
      html += renderLabel(field);
      html += '<input type="' + field.type + '" id="' + id + '" name="' + field.name + '" style="' + STYLES.input + '"' + placeholder + required + '>';
    }

    return html;
  }

  // ---------------------------------------------------------------------------
  // Form rendering
  // ---------------------------------------------------------------------------

  function renderForm(container, formId, definition) {
    var apiUrl = container.getAttribute('data-form-api') ||
      window.ESTEEMED_FORMS_API ||
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-40cb0fd1-016f-4383-8b38-97bdc816fd0f/forms/submit';

    var formHTML = '<div style="' + STYLES.wrapper + '">';
    formHTML += '<form id="ef-form-' + formId + '" novalidate>';

    var fields = definition.fields;
    var i = 0;

    while (i < fields.length) {
      var field = fields[i];

      // Check if this and the next field are both halfWidth
      if (field.halfWidth && i + 1 < fields.length && fields[i + 1].halfWidth) {
        var nextField = fields[i + 1];
        formHTML += '<div style="margin-bottom:0;">';
        formHTML += '<div style="' + STYLES.halfWidthLeft + '">' + renderField(field) + '</div>';
        formHTML += '<div style="' + STYLES.halfWidthRight + '">' + renderField(nextField) + '</div>';
        formHTML += '</div>';
        i += 2;
      } else {
        formHTML += '<div style="' + STYLES.fieldWrapper + '">' + renderField(field) + '</div>';
        i += 1;
      }
    }

    formHTML += '<button type="submit" style="' + STYLES.button + '"';
    formHTML += ' onmouseover="this.style.background=\'#2d4a6f\'"';
    formHTML += ' onmouseout="this.style.background=\'#1e3a5f\'"';
    formHTML += '>' + escapeHTML(definition.submitLabel) + '</button>';
    formHTML += '<div class="ef-error" style="display:none;"></div>';
    formHTML += '</form>';
    formHTML += '</div>';

    container.innerHTML = formHTML;

    // Attach focus/blur styles to inputs, selects, textareas
    var inputs = container.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], select, textarea');
    inputs.forEach(function (el) {
      el.addEventListener('focus', function () {
        el.style.borderColor = '#2563eb';
        el.style.outline = 'none';
        el.style.boxShadow = '0 0 0 2px rgba(37,99,235,0.2)';
      });
      el.addEventListener('blur', function () {
        el.style.borderColor = '#d1d5db';
        el.style.boxShadow = 'none';
      });
    });

    // Handle form submission
    var form = container.querySelector('form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleSubmit(container, form, formId, definition, apiUrl);
    });
  }

  // ---------------------------------------------------------------------------
  // Submission handler
  // ---------------------------------------------------------------------------

  function handleSubmit(container, form, formId, definition, apiUrl) {
    var btn = form.querySelector('button[type="submit"]');
    var errorDiv = form.querySelector('.ef-error');

    // Hide previous errors
    errorDiv.style.display = 'none';

    // Collect values
    var data = { _form_id: formId };
    definition.fields.forEach(function (field) {
      if (field.type === 'checkboxes') {
        var checked = form.querySelectorAll('input[name="' + field.name + '"]:checked');
        var values = [];
        checked.forEach(function (cb) { values.push(cb.value); });
        data[field.name] = values;
      } else {
        var el = form.querySelector('[name="' + field.name + '"]');
        if (el) data[field.name] = el.value;
      }
    });

    // Add UTM params
    var utm = getUTMParams();
    Object.keys(utm).forEach(function (key) {
      data[key] = utm[key];
    });

    // Loading state
    var originalLabel = btn.textContent;
    btn.textContent = 'Submitting...';
    btn.disabled = true;
    btn.style.cssText = STYLES.buttonDisabled;

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function () {
        // Success - replace form contents
        var wrapper = container.querySelector('div');
        wrapper.innerHTML = '<div style="' + STYLES.success + '">' +
          '<p style="margin:0;font-size:16px;font-weight:600;">Thank you! Your submission has been received.</p>' +
          '<p style="margin:8px 0 0;font-size:14px;">We\'ll be in touch shortly.</p>' +
          '</div>';
      })
      .catch(function () {
        // Error - show message and restore button
        errorDiv.innerHTML = '<p style="margin:0;">Something went wrong. Please try again or contact us directly.</p>';
        errorDiv.style.cssText = STYLES.error;
        btn.textContent = originalLabel;
        btn.disabled = false;
        btn.style.cssText = STYLES.button;
      });
  }

  // ---------------------------------------------------------------------------
  // Initialise on DOMContentLoaded
  // ---------------------------------------------------------------------------

  function init() {
    var containers = document.querySelectorAll('[data-esteemed-form]');
    containers.forEach(function (container) {
      var formId = container.getAttribute('data-esteemed-form');
      var definition = FORM_DEFINITIONS[formId];
      if (!definition) {
        console.warn('[esteemed-forms] Unknown form ID: "' + formId + '"');
        return;
      }
      renderForm(container, formId, definition);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
