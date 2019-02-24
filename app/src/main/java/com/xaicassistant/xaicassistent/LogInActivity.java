package com.xaicassistant.xaicassistent;

        import android.support.v7.app.AppCompatActivity;
        import android.os.Bundle;
        import android.text.TextUtils;
        import android.util.Log;
        import android.view.View;
        import android.widget.Button;
        import android.widget.EditText;

        import java.util.regex.Pattern;

public class LogInActivity extends AppCompatActivity {

    EditText emialInput;
    EditText passInput;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        emialInput = findViewById(R.id.emailInput);
        passInput = findViewById(R.id.passInput);
        Button loginBtn = findViewById(R.id.loginBtn);
        loginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(validateFormatPassword() && validateFormatEmail()){
                    login();
                }
            }
        });
    }

    private boolean validateFormatEmail(){
        if(TextUtils.isEmpty(emialInput.getText().toString())){
            emialInput.setError("tiene que introducir algo en el campo");
            emialInput.setFocusableInTouchMode(true);
            return false;
        }
        String emailPattern = "^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@" +
                "[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$";
        if(!Pattern.matches(emailPattern, emialInput.getText().toString())){
            emialInput.setError("formato erroneo");
            emialInput.setFocusableInTouchMode(true);
            return false;
        }
        return true;
    }

    private boolean validateFormatPassword(){
        if(TextUtils.isEmpty(passInput.getText().toString())){
            passInput.setError("tiene que introducir algo en el campo");
            passInput.setFocusableInTouchMode(true);
            return false;
        }
        if(passInput.getText().toString().length() < 10){
            passInput.setError("La largada de la contraseña no puede ser menor a 10");
            passInput.setFocusableInTouchMode(true);
            return false;
        }
        return true;
    }

    private void login(){
        Log.d("xa", "relizando log in");
    }
}
