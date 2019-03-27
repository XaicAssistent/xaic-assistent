package com.xaicassistant.xaicassistent;

import android.app.Dialog;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class RegisterActivity extends AppCompatActivity {

    Dialog myDialog;
    Button btnAddSchedule;
    Button btnCompany;
    Button btnUser;
    Button btnCancel;
    Dialog dialogSchedule;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        //choose type of user
                myDialog = new Dialog(this);
                myDialog.setContentView(R.layout.user_type);
                myDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
                btnCompany  =(Button) myDialog.findViewById(R.id.btnCompany);
                btnUser = (Button) myDialog.findViewById(R.id.btnUser);
                btnCancel = (Button) myDialog.findViewById(R.id.btnCancelar);
                btnCompany.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        Log.d("opcion","empresa");
                        myDialog.dismiss();
                    }
                });
                btnUser.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        Log.d("opcion","usuario");
                        myDialog.dismiss();
                    }
                });
                btnCancel.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        Log.d("opcion","opceracion cancelada");
                        myDialog.dismiss();
                    }
                });
                myDialog.show();

                //ADD NEW SCHEDULE
        dialogSchedule = new Dialog(this);
        dialogSchedule.setContentView(R.layout.add_schedule);
        dialogSchedule.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        btnAddSchedule = findViewById(R.id.btnAddSchedule);
        Button cancel_add_schedule = (Button) dialogSchedule.findViewById(R.id.accept_add_schedule);
        Button accept_add_schedule = (Button) dialogSchedule.findViewById(R.id.cancel_add_schedule);
                btnAddSchedule.setOnClickListener(new View.OnClickListener(){
                    @Override
                    public void onClick(View view) {

                        dialogSchedule.show();
                    }
                });


        cancel_add_schedule.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d("opcion","opceracion cancelada");
                dialogSchedule.dismiss();
            }
        });
        accept_add_schedule.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d("opcion","opceracion cancelada");
                dialogSchedule.dismiss();
            }
        });

            }




}
