package com.example.voiceassistantexamination;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class MainActivity extends AppCompatActivity {
    TextView t1,t2;
    Button b;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Window window = this.getWindow();
        window.setStatusBarColor(this.getResources().getColor(R.color.status));
        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        helper obj=new helper(getApplicationContext());
        if(obj.isexist()){
            Intent i=new Intent(MainActivity.this,MainActivity3.class);
            startActivity(i);
            finish();
        }
        setContentView(R.layout.activity_main);
        t1=findViewById(R.id.username);
        t2=findViewById(R.id.Password);
        b=findViewById(R.id.login);
        b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String name=t1.getText().toString();
                String password=t2.getText().toString();
                FirebaseDatabase database=FirebaseDatabase.getInstance();
                DatabaseReference ref=database.getReference("students");
                ref.get().addOnCompleteListener(new OnCompleteListener<DataSnapshot>() {
                    @Override

                    public void onComplete(@NonNull Task<DataSnapshot> task) {
                        for(DataSnapshot d:task.getResult().getChildren()){
                            Log.d("data",name+""+password+""+d.getKey()+""+d.child("email").getValue().toString());
                            if (d.getKey().equalsIgnoreCase(name) && d.child("email").getValue().toString().equalsIgnoreCase(password)) {
                                helper obj=new helper(getApplicationContext());
                                obj.adduser(d.child("registerno").getValue().toString(),
                                        d.child("blind").getValue().toString(), d.child("section").getValue().toString(),
                                        d.child("year").getValue().toString(), d.child("department").getValue().toString());
                                Intent i=new Intent(MainActivity.this,MainActivity3.class);
                                startActivity(i);
                                finish();
                                break;
                            }
                        }

                    }
                });
            }
        });
    }
}